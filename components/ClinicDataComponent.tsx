import { Loader } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const ClinicDataComponent = ({
  countyDetails,
  loading,
  error,
  type,
}: {
  countyDetails: any;
  loading: boolean;
  error: boolean;
  type: string;
}) => {
  // console.log("error ", error);
  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-44">
            <Loader
              size={50}
              className="text-blue-500 animate-spin duration-1000  ease-in-out"
            />
          </div>
        </>
      ) : !loading && countyDetails ? (
        type === "state" ? (
          <div className="my-5">
            {countyDetails?.demographicsData && (
              <ScrollArea className="h-[420px] pr-3">
                {/* Demographics Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                    Demographics
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                    <p>
                      <span className="font-semibold">
                        Total Population Density:
                      </span>{" "}
                      {countyDetails?.demographicsData?.totalPopulationDensity}{" "}
                      people per square mile
                    </p>
                    <p>
                      <span className="font-semibold">
                        Total Child Population Density:
                      </span>{" "}
                      {countyDetails?.demographicsData?.childPopulationDensity}{" "}
                      children per square mile
                    </p>
                    <p>
                      <span className="font-semibold">
                        Median Household Size:
                      </span>{" "}
                      {countyDetails?.demographicsData?.averageHouseholdSize}{" "}
                      persons per household
                    </p>
                    <p>
                      <span className="font-semibold">
                        Population Growth Rate (2010-23):
                      </span>{" "}
                      {(
                        countyDetails?.demographicsData
                          ?.populationGrowthRate2010 * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>
                      <span className="font-semibold">
                        Population Growth Rate (2020-23):
                      </span>{" "}
                      {(
                        countyDetails?.demographicsData
                          ?.populationGrowthRate2020 * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>
                      <span className="font-semibold">
                        Income Growth Rate (2010-23):
                      </span>{" "}
                      {(
                        countyDetails?.demographicsData?.incomeGrowthRate2010 *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>

                {/* Economic Indicators Section */}
                <div className="space-y-4 mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                    Economic Indicators
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                    <p>
                      <span className="font-semibold">
                        Median Household Income:
                      </span>{" "}
                      $
                      {countyDetails?.economicIndicators?.medianHouseholdIncome.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Private Insurance Coverage:
                      </span>{" "}
                      {
                        countyDetails?.healthcareInsurance
                          ?.privateInsuranceCoverage
                      }
                    </p>
                    <p>
                      <span className="font-semibold">
                        Medicare Insurance Coverage:
                      </span>{" "}
                      {
                        countyDetails?.healthcareInsurance
                          ?.medicareInsuranceCoverage
                      }
                    </p>
                    <p>
                      <span className="font-semibold">
                        Medicaid Insurance Coverage:
                      </span>{" "}
                      {
                        countyDetails?.healthcareInsurance
                          ?.medicaidInsuranceCoverage
                      }
                    </p>
                  </div>
                </div>

                {/* Market Saturation Section */}
                <div className="space-y-4 mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                    Market Saturation
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                    <p>
                      <span className="font-semibold">
                        Total Dental Clinic Density:
                      </span>{" "}
                      {
                        countyDetails?.marketSaturation
                          ?.totalDentalClinicDensity
                      }{" "}
                      per 10,000 people
                    </p>
                    <p>
                      <span className="font-semibold">
                        Specialist Clinic Density:
                      </span>{" "}
                      {countyDetails?.marketSaturation?.specialistClinicDensity}{" "}
                      per 10,000 people
                    </p>
                  </div>
                </div>

                {/* Location Data Section */}
                <div className="space-y-4 mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                    Location Data
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                    <p>
                      <span className="font-semibold">
                        Average Distance to Nearest Competitor:
                      </span>{" "}
                      {
                        countyDetails?.locationData
                          ?.averageDistanceToNearestCompetitor
                      }{" "}
                      miles
                    </p>
                    <p>
                      <span className="font-semibold">
                        Proximity to Schools:
                      </span>{" "}
                      {countyDetails?.locationData?.proximityToSchools} miles
                    </p>
                  </div>
                </div>

                {/* Final Statement */}
                <div className="mt-8">
                  <p className="text-lg font-semibold text-gray-700">
                    The median income of households in the area is: $
                    {countyDetails?.economicIndicators?.medianHouseholdIncome.toLocaleString()}
                  </p>
                </div>
              </ScrollArea>
            )}
          </div>
        ) : (
          <>
            <ScrollArea className="h-[420px] pr-3">
              {/* Demographics Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Demographics
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                  <p>
                    <span className="font-semibold">
                      Total Population Density:
                    </span>{" "}
                    {countyDetails?.totalPopulationDensity?.toFixed(2)} people
                    per sq. mile
                  </p>
                  <p>
                    <span className="font-semibold">
                      Child Population Density:
                    </span>{" "}
                    {countyDetails?.childPopulationDensity?.toFixed(2)} children
                    per sq. mile
                  </p>
                  <p>
                    <span className="font-semibold">
                      Average Household Size:
                    </span>{" "}
                    {countyDetails?.averageHouseholdSize}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Population Growth Rate (2010-2023):
                    </span>{" "}
                    {(countyDetails?.populationGrowthRate2010 * 100).toFixed(2)}
                    %
                  </p>
                  <p>
                    <span className="font-semibold">
                      Population Growth Rate (2015-2023):
                    </span>{" "}
                    {(countyDetails?.populationGrowthRate2015 * 100).toFixed(2)}
                    %
                  </p>
                  <p>
                    <span className="font-semibold">
                      Income Growth Rate (2010-2023):
                    </span>{" "}
                    {(countyDetails?.incomeGrowthRate2010 * 100).toFixed(2)}%
                  </p>
                  <p>
                    <span className="font-semibold">
                      Income Growth Rate (2015-2023):
                    </span>{" "}
                    {(countyDetails?.incomeGrowthRate2015 * 100).toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Economic Indicators Section */}
              <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Economic Indicators
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                  <p>
                    <span className="font-semibold">
                      Median Household Income:
                    </span>{" "}
                    ${countyDetails?.medianHouseholdIncome?.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Private Insurance Coverage:
                    </span>{" "}
                    {countyDetails?.privateInsuranceCoverage}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Medicare Insurance Coverage:
                    </span>{" "}
                    {countyDetails?.medicareInsuranceCoverage}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Medicaid Insurance Coverage:
                    </span>{" "}
                    {countyDetails?.medicaidInsuranceCoverage}
                  </p>
                </div>
              </div>

              {/* Market Saturation Section */}
              <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Market Saturation
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
                  <p>
                    <span className="font-semibold">
                      Total Dental Clinic Density:
                    </span>{" "}
                    {countyDetails?.totalDentalClinicDensity} per 10,000 people
                  </p>
                </div>
              </div>

              {/* Final Score Section */}
              <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Final Score
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold text-gray-700">
                    Community Score: {countyDetails?.score?.toFixed(2)}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </>
        )
      ) : error ? (
        <>
          <div className="flex items-center justify-center h-44">
            <p className="text-red-500">
              Error fetching data. Please try again later.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          {/* <p className="text-gray-500">No data available</p> */}
        </div>
      )}
    </>
  );
};

export default ClinicDataComponent;
