"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapboxLayout from "@/components/MapboxLayout";
import { Home, Users2, TrendingUp, Baby } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMapStore from "@/store/useMapStore";
import ClinicDataComponent from "@/components/ClinicDataComponent";
import { statistics } from "@/components/statistics";
import DemographicsData from "@/components/DemographicsData";
import { Tab, useTabStore } from "@/store/useTabStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import useTabsDataStore from "@/store/useTabsDataStore"

export default function HomeP() {
  const [States, setStates] = useState<any[]>([]);
  const [CountyData, setCountyData] = useState<any[] | null>([]);
  const [filterCountyByState, setFilterCountyByState] = useState<any[]>([]);
  const [stateName, setStateName] = useState<string>("State");
  const [countyName, setCountyName] = useState<string>("County");
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null); // Added state to track the selected state
  const [selectedCountyId, setSelectedCountyId] = useState<string | null>(null);
  const [selectedStateCountyId, setSelectedStateCountyId] = useState< string | null>(null);
  const [countyDetails, setCountyDetails] = useState<any | null>(null);
  const [stateDetails, setStateDetails] = useState<any | null>(null);
  const [countyLoading, setCountyLoading] = useState<boolean>(false);
  const [stateLoading, setStateLoading] = useState<boolean>(false);
  const [placeDetails, setPlaceDetails] = useState<any | null>(null);
  const [censusTractDetails, setCensusTractDetails] = useState<any | null>(
    null
  );

  const [stateButtonId, setStateButtonId] = useState<string | null>(null);
  const [CountyStateButtonId, setCountyStateButtonId] = useState<string | null>(null)
  const [CountyButtonId, setCountyButtonId] = useState<string | null>(null)

  console.log(censusTractDetails, " censusTractDetails");

  const { setZoom } = useMapStore();
  const {CountyTabCountyId,CountyTabStateId,stateTabStateId} = useTabsDataStore()

  useEffect(() => {
    console.log(CountyTabCountyId, "CountyTabCountyId",CountyTabStateId, "CountyTabStateId",stateTabStateId, "stateTabStateId");
    if(CountyTabCountyId){
      filterDataByStateClick(CountyTabStateId)
      setCountyButtonId(CountyTabCountyId)
    }
    if(stateTabStateId){
      setStateButtonId(stateTabStateId)
    }
    if(CountyTabStateId){
      setCountyStateButtonId(CountyTabStateId)
    }
  }, [CountyTabCountyId,CountyTabStateId,stateTabStateId])

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

  const fetchStates = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    );
    const data = await response.json();
    const filterData = data.features.map((state: any) => {
      return {
        label: state.properties.name,
        value: state.id,
      };
    });
    // console.log(JSON.stringify(filterData,null,0), "filterData");
    setStates(filterData);
  };

  const fetchCountyData = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/Lalman888/County_state_fips_data_2023/refs/heads/main/cb_2023_us_county_500.json"
    );
    const data = await response.json();

    const filteredData = data.features.map((county: any) => {
      return {
        label: county.properties.NAME,
        value: county.properties.COUNTYFP,
        state: county.properties.STATEFP,
      };
    });

    setCountyData(filteredData);
  };

  useEffect(() => {
    fetchStates();
    fetchCountyData();
  }, []);

  const filterDataByStateClick = (stateId: string) => {
    // console.log(stateId, "stateId");
    // console.log(CountyData, "CountyData");

    setSelectedStateId(stateId); // Update selected state
    if (CountyData) {
      const filteredFeatures = CountyData.filter(
        (item: any) => item.state === stateId.toString()
      );
      // console.log(filteredFeatures, "filteredFeatures");
      setFilterCountyByState(filteredFeatures);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const mapRefs = useRef<any>(null);

  const handleSearch = async () => {
    if (!searchQuery) return;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    setSearchResults(data.features);

    if (data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      mapRefs.current?.flyTo({ center: [lng, lat], zoom: 12, essential: true });
    }
  };

  const [error, setError] = useState<boolean>(false);

  const getCountyDetails = async (countyId: string, stateId: string) => {
    console.log(countyId, "countyId", stateId, "stateId");
    setSelectedStateId(stateId);
    setSelectedCountyId(countyId);
    if (!countyId) return;
    if (!stateId) return;
    filterDataByStateClick(stateId);
    setCountyLoading(true);
    // const countyIDFiltered = countyId.slice(stateId.length, countyId.length);
    // console.log(countyIDFiltered, "countyIDFiltered");
    try {
      const response = await fetch(
        `https://dentalapi.cwsn.ai/county/all?county=${countyId}&state=${stateId}`
      );
      const data = await response.json();
      console.log(data, "data");
      setCountyDetails(data);
      setCountyLoading(false);
    } catch (error) {
      console.log(error, "error in fetching county details");
      setCountyLoading(false);
      setError(true);
    }

    // console.log(data, "data");
  };

  const getStateDetails = async (stateId: string) => {
    setSelectedStateId(stateId);
    if (!stateId) return;
    setStateLoading(true);
    // filterDataByStateClick(stateId);
    try {
      const response = await fetch(
        `https://dentalapi.cwsn.ai/state/all?state=${stateId}`
      );
      const data = await response.json();
      setStateDetails(data);
      setStateLoading(false);
    } catch (error) {
      console.log(error, "error");
      setStateLoading(false);
      // setError("Error in fetching state details");
    }
  };

  const { activeTab, setActiveTab } = useTabStore();
  // console.log(activeTab, "activeTab");
  // console.log("setSelectedCountyId", selectedCountyId);
  console.log("place details", placeDetails);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto flex py-3  justify-center items-center h-screen">
        <div className="w-full flex flex-col sm:flex-row gap-6 items-start justify-between h-full">
          <div className="sm:w-5/12 w-full h-full">
            <Card className="h-full pt-2">
              <CardContent>
                <Tabs
                  defaultValue={activeTab}
                  className="w-full"
                  // value=""
                  value={activeTab}
                  onValueChange={(value) => {
                    // console.log(value, "value");
                    setActiveTab(value as Tab);
                  }}
                >
                  <TabsList>
                    <TabsTrigger
                      value="national"
                      onClick={() => {
                        setZoom(4);
                        // console.log("zoomed");
                      }}
                    >
                      National
                    </TabsTrigger>
                    <TabsTrigger
                      value="state"
                      onClick={() => {
                        setZoom(5);
                        // console.log("zoomed");
                      }}
                    >
                      State
                    </TabsTrigger>
                    <TabsTrigger value="county">County</TabsTrigger>
                    {/* <TabsTrigger value="place">Place</TabsTrigger> */}
                    <TabsTrigger value="tract">Tract</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value="national">
                    <h1 className="text-base font-medium text-center uppercase text-gray-800 mb-3">
                      United States
                    </h1>
                    <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
                      {statistics.map((stat, index) => (
                        <div key={index} className="flex items-start ">
                          <div className=" mr-3">{stat.icon}</div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">
                              {stat.label}
                            </h3>
                            <p className="text-base font-semibold text-gray-900">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="state">
                    <h4 className="text-base font-medium text-primary text-center py-5">
                      Please select a state to view insights
                    </h4>
                    <select
                      name="state"
                      id="state"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => {
                        // setSelectedStateId(e.target.value);
                        setStateButtonId(e.target.value);
                        const selectedOption =
                          e.target.options[e.target.selectedIndex];
                        const label = selectedOption.textContent || ""; // Get the label
                        setStateName(label);
                        // getStateDetails(e.target.value);
                      }}
                      // value={stateName}
                      value={stateButtonId || ""}
                    >
                      <option value="">Select State</option>
                      {States.map((state, index) => (
                        <>
                          <option key={index} value={state.value}>
                            {state.label}
                          </option>
                        </>
                      ))}
                    </select>

                    <div className="flex justify-center w-full my-5">
                      <Button
                        onClick={() => {
                          setSelectedStateId(stateButtonId);
                          if(stateButtonId){
                            getStateDetails(stateButtonId);
                          }
                        }}
                        variant="default"
                        size="lg"
                      >
                        Search
                      </Button>
                    </div>

                    <ClinicDataComponent
                      countyDetails={stateDetails}
                      loading={stateLoading}
                      error={error}
                      type="state"
                    />
                  </TabsContent>

                  <TabsContent value="county">
                    <h4 className="text-base font-medium text-primary text-center py-5">
                      Please select a county
                    </h4>
                    <select
                      name="state"
                      id="state"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const selectedOption =
                          e.target.options[e.target.selectedIndex];
                        // console.log(selectedOption, "   selectedOption",selectedOption.textContent);
                        const label = selectedOption.textContent || ""; // Get the label
                        // console.log(label, "   e.target.label",e);

                        setStateName(label);
                        filterDataByStateClick(e.target.value);
                         setCountyStateButtonId(e.target.value);
                      }}
                      // value={stateName}
                      value={CountyStateButtonId || ""}
                    >
                      <option value="">Select State</option>
                      {States.map((state, index) => (
                        <>
                          <option
                            key={index}
                            value={state.value}
                            // onClick={() => {
                            //   console.log(state, "   state");
                            //   setStateName(state.label);
                            // }}
                          >
                            {state.label}
                          </option>
                        </>
                      ))}
                    </select>
                    <div className="h-10 bg-white w-full flex items-center justify-center"></div>
                    <select
                      name="county"
                      id="county"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => {
                        // setSelectedCountyId(e.target.value);
                        setCountyButtonId(e.target.value);

                        const selectedOption =
                          e.target.options[e.target.selectedIndex];
                        const label = selectedOption.textContent || ""; // Get the label
                        setCountyName(label);
                        // if (selectedStateId) {
                        //   getCountyDetails(e.target.value, selectedStateId);
                        // }
                      }}
                      value={CountyButtonId || ""}
                    >
                      <option value="">Select County</option>
                      {filterCountyByState.map((county, index) => (
                        <>
                          <option key={county.value} value={county.value}>
                            {county.label}
                          </option>
                        </>
                      ))}
                    </select>

                    <div className="flex justify-center w-full my-5">
                      <Button
                        onClick={() => {
                          // setSelectedStateId(stateButtonId);
                          // if(stateButtonId){
                          //   getStateDetails(stateButtonId);
                          // }
                          // setSelectedCountyId(e.target.value);
                          // if (selectedStateId) {
                          //   getCountyDetails(e.target.value, selectedStateId);
                          // }
                          if(CountyStateButtonId && CountyButtonId){
                            getCountyDetails(CountyButtonId, CountyStateButtonId);
                          }
                          
                          
                        }}
                        variant="default"
                        size="lg"
                      >
                        Search
                      </Button>
                    </div>

                    {/* <h3 className="text-2xl font-semibold text-primary text-center py-5">
                      {countyName} - {stateName}
                    </h3> */}
                    <ClinicDataComponent
                      countyDetails={countyDetails}
                      loading={countyLoading}
                      error={error}
                      type="county"
                    />
                  </TabsContent>
                  {/* <TabsContent value="place">
                    <ScrollArea className="h-[650px] pt-8">
                      {placeDetails &&
                      placeDetails !== null &&
                      placeDetails?.PlaceType === "clinic" ? (
                        <>
                          <DentalClinicDetails clinic={placeDetails} />
                        </>
                      ) : placeDetails?.PlaceType === "school" ? (
                        <>
                        <SchoolInfo school={placeDetails} />
                        </>
                      ) : (
                        <>
                          <h4 className="text-base font-medium text-primary text-center py-5">
                            Please select a place
                          </h4>
                        </>
                      )}
                    </ScrollArea>
                  </TabsContent> */}
                  <TabsContent value="address">
                    {/* Search Bar */}
                    <div className=" bg-white p-2 ">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search location"
                        className="border p-2 rounded-md"
                      />
                      <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-md ml-2"
                      >
                        Search
                      </button>
                    </div>
                  </TabsContent>
                  <TabsContent value="tract">
                    <ScrollArea className="h-[650px] pt-8">
                      <h4 className="text-base font-medium text-primary text-center py-5">
                        Census Tract
                      </h4>
                      <div>
                        {censusTractDetails && (
                          <>
                            <h4 className="text-base font-medium text-primary text-center py-2">
                              {censusTractDetails?.properties?.NAMELSAD}
                            </h4>
                            <h4 className="text-base font-medium text-primary text-center py-2">
                            GEOID {censusTractDetails?.properties?.GEOID}
                            </h4>
                          </>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="sm:w-9/12 w-full ">
            {/* <MapLayout /> */}
            <Card>
              <CardContent className="my-5">
                <MapboxLayout
                  selectedStateId={selectedStateId}
                  selectedCountyIdB={selectedCountyId}
                  getStateDetails={getStateDetails}
                  getCountyDetails={getCountyDetails}
                  setStateName={setStateName}
                  setCountyName={setCountyName}
                  mapRefs={mapRefs}
                  setPlaceDetails={setPlaceDetails}
                  placeDetails={placeDetails}
                  setCensusTractDetails={setCensusTractDetails}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const SchoolInfo = ({ school }: any) => (
  <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">{school?.name}</h2>
    <p className="text-gray-700">
      <strong>Address:</strong> {school.address}, {school.addressCity},{" "}
      {school.stateAbbr} {school.zipcode}
    </p>
    <p className="text-gray-700">
      <strong>Phone:</strong> {school.phone}
    </p>
    <p className="text-gray-700">
      <strong>Type:</strong> {school.type} ({school.category})
    </p>
    <p className="text-gray-700">
      <strong>Grades:</strong> {school.lowestGrade} to {school.highestGrade}
    </p>
    <p className="text-gray-700">
      <strong>Total Students:</strong> {school.totalStudent}
    </p>
    <p className="text-gray-700">
      <strong>Asian/Pacific Islander Students:</strong> {school.asapStudent}
    </p>
    <p className="text-gray-700">
      <strong>African-American Students:</strong> {school.afStudent}
    </p>
    <p className="text-gray-700">
      <strong>White Students:</strong> {school.whStudent}
    </p>
    <p className="text-gray-700">
      <strong>Student-Teacher Ratio:</strong> {school.ratio.toFixed(2)}
    </p>
    <p className="text-gray-700">
      <strong>Teachers (FTE):</strong> {school.fteTeachers}
    </p>
    <p className="text-gray-700">
      <strong>County:</strong> {school.addressCounty}
    </p>
  </div>
);

const DentalClinicDetails = ({ clinic }: any) => {
  return (
    <div className="clinic-details">
      {/* Header */}
      <h1 className="text-2xl font-bold">{clinic?.name}</h1>
      <p className="text-gray-700">{clinic?.formatted_address}</p>
      <p className="text-gray-700">Phone: {clinic?.formatted_phone_number}</p>
      <p className="text-gray-700">
        International Phone: {clinic?.international_phone_number}
      </p>

      {/* Ratings */}
      <div className="rating my-3">
        <p className="text-yellow-500 font-medium">
          Rating: {clinic?.rating} / 5
        </p>
      </div>

      {/* Opening Hours */}
      <div className="opening-hours">
        <h2 className="text-xl font-semibold my-2">Opening Hours:</h2>
        <ul className="list-disc list-inside">
          {clinic?.current_opening_hours?.weekday_text?.map(
            (day: any, index: any) => (
              <li key={index}>{day}</li>
            )
          )}
        </ul>
      </div>

      {/* Reviews */}
      <div className="reviews mt-5">
        <h2 className="text-xl font-semibold my-2">Reviews:</h2>
        <ul>
          {clinic?.reviews?.slice(0, 3).map((review: any, index: any) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">{review?.author_name}</p>
              <p className="text-gray-500">
                {review?.relative_time_description}
              </p>
              <p className="italic">"{review.text}"</p>
              <p className="text-yellow-500 font-medium">
                Rating: {review?.rating} / 5
              </p>
              <p className="text-gray-500">
                Time: {new Date(review?.time * 1000).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Photos */}
      {/* <div className="photos mt-5">
        <h2 className="text-xl font-semibold my-2">Photos:</h2>
        <div className="grid grid-cols-3 gap-3">
          {clinic.photos.slice(0, 6).map((photo, index) => (
            <img
              key={index}
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=YOUR_API_KEY`}
              alt={`Clinic ${index}`}
              className="rounded-lg"
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};
