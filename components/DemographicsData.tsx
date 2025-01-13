import { Baby, Home, TrendingUp, Users2, Loader } from "lucide-react";
import React from "react";

const DemographicsData = ({
  Details,
  loading,
  type,
}: {
  Details: any;
  loading: boolean;
  type: string;
}) => {
  console.log("Details ", Details);
  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-28">
            <Loader
              size={50}
              className="text-blue-500 animate-spin duration-1000  ease-in-out"
            />
          </div>
        </>
      ) : !loading && Details ? (
        type === "state" ? (
          <>
            {" "}
            <div>
              {Details?.demographicsData && (
                <>
                
                  <div className="grid grid-cols-1 my-6 lg:grid-cols-1 gap-4">
                    {/* Demographics Data */}
                    <div className="flex items-start w-auto">
                      <div className="mr-3">
                        <Users2 className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          Population Density
                        </h3>
                        <p className="text-base font-semibold text-gray-900">
                          {Details?.demographicsData?.totalPopulationDensity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3">
                        <Baby className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          Child Population Density
                        </h3>
                        <p className="text-base font-semibold text-gray-900">
                          {Details?.demographicsData?.childPopulationDensity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3">
                        <Home className="text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          Average Household Size
                        </h3>
                        <p className="text-base font-semibold text-gray-900">
                          {Details?.demographicsData?.averageHouseholdSize}
                        </p>
                      </div>
                    </div>

                    {["2022", "2020", "2010"].map((year) => (
                      <div
                        className="flex items-start"
                        key={`population-growth-${year}`}
                      >
                        <div className="mr-3">
                          <TrendingUp className="text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-700">
                            Population Growth Rate {year}
                          </h3>
                          <p className="text-base font-semibold text-gray-900">
                            {
                              Details?.demographicsData[
                                `populationGrowthRate${year}`
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>{" "}
          </>
        ) : (
          <>
           <div>
          <div className="grid grid-cols-1 my-6 lg:grid-cols-1 gap-4">
            {/* Total Population Density */}
            <div className="flex items-start w-auto">
              <div className="mr-3">
                <Users2 className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Population Density
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {Details.totalPopulationDensity}
                </p>
              </div>
            </div>

            {/* Child Population Density */}
            <div className="flex items-start">
              <div className="mr-3">
                <Baby className="text-pink-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Child Population Density
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {Details.childPopulationDensity}
                </p>
              </div>
            </div>

            {/* Average Household Size */}
            <div className="flex items-start">
              <div className="mr-3">
                <Home className="text-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Average Household Size
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {Details.averageHouseholdSize}
                </p>
              </div>
            </div>

            {/* Population Growth Rates */}
            <div className="flex items-start">
              <div className="mr-3">
                <TrendingUp className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Population Growth Rate (2010-2023)
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {(Details.populationGrowthRate2010 * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3">
                <TrendingUp className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Population Growth Rate (2015-2023)
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {(Details.populationGrowthRate2015 * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
          </>
        )
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </>
  );
};

export default DemographicsData;
