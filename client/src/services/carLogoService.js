import vehicleLogotypes from "@avto-dev/vehicle-logotypes/src/vehicle-logotypes.json";

const getLogoUrl = (brandName) => {
    if (!brandName) return null;

    const result = vehicleLogotypes[brandName.toLowerCase()];

    if (result && result.logotype && result.logotype.uri) {
        return result.logotype.uri;
    }
    return null;
};

const carLogoService = {
    getLogoUrl
};

export default carLogoService;