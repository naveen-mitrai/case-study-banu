class DeliveryService {
  static minAllowedDroneBatteryLevel = 25;

  static validateDrones(allDrones, weightToLoad) {
    return allDrones.filter(
      (drone) =>
        drone.weightLimit >= weightToLoad &&
        drone.batteryLevel >= this.minAllowedDroneBatteryLevel
    );
  }
}

export default DeliveryService;
