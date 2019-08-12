import delay from "../../util/delay";

export async function someResourceApi(resourceId) {
  await delay(2000);

  if (resourceId === "error") throw new Error("Failed!");

  return {
    resourceId,
    resourceNumber: 123,
    resourceName: "Test Resource"
  };
}
