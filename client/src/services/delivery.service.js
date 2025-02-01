class DeliveryService {
  static minAllowedDroneBatteryLevel = 25;

  static validateDrones(allDrones, weightToLoad) {
    console.log(weightToLoad);
    console.log(allDrones);
    return allDrones.filter((drone) => drone.weightLimit >= weightToLoad);
  }
}

export default DeliveryService;
