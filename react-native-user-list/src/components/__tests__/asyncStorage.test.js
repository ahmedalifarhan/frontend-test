import AsyncStorage from "@react-native-async-storage/async-storage";

describe("AsyncStorage Mock Test", () => {
  it("should store and retrieve data", async () => {
    await AsyncStorage.setItem("testKey", "testValue");
    const value = await AsyncStorage.getItem("testKey");
    expect(value).toBe("testValue");
  });
});
