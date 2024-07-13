

export type FieldType = {
    key: string;
    value: string[];
};

export const PerformanceDefaultData: FieldType[] = [
    { key: "Chipset", value: [""] },
    { key: "No Of Cores", value: [""] },
    { key: "CPU", value: [""] },
    { key: "Architecture", value: [""] },
    { key: "Fabrication", value: [""] },
    { key: "RAM", value: [""] },
    { key: "Graphics", value: [""] },
]

export const DesignDefaultData: FieldType[] = [
    { key: "Height", value: [""] },
    { key: "Width", value: [""] },
    { key: "Thickness", value: [""] },
    { key: "Weight", value: [""] },
    { key: "Screen Unlock", value: [""] },
]

export const DisplayDefaultData: FieldType[] = [
    { key: "Resolution", value: [""] },
    { key: "Display Type", value: [""] },
    { key: "Size", value: [""] },
    { key: "Bezel-less display", value: [""] },
    { key: "Pixel Density", value: [""] },
    { key: "Protection", value: [""] },
    { key: "TouchScreen", value: [""] },
    { key: "Color Reproduction", value: [""] },
    { key: "Screen to body percentage", value: [""] },
    { key: "Display Refresh Rate", value: [""] },
]

export const CameraDefaultData: FieldType[] = [
    { key: "Rear camera setup", value: [""] },
    { key: "Rear camera (Primary)", value: [""] },
    { key: "Rear camera (Secondary)", value: [""] },
    { key: "Rear camera (Tertiary)", value: [""] },
    { key: "Front camera setup", value: [""] },
    { key: "Front camera (Primary)", value: [""] },
    { key: "Flash", value: [""] },
    { key: "Video Resolution (Rear)", value: [""] },
    { key: "Video Resolution (Front)", value: [""] },
    { key: "Video Recording Features", value: [""] },
    { key: "Optical Image Stabilization(OIS)", value: [""] },
    { key: "Camera Features", value: [""] },
    { key: "Shooting Modes", value: [""] },
]

export const BatteryDefaultData: FieldType[] = [
    { key: "Type", value: [""] },
    { key: "Capacity", value: [""] },
    { key: "Removable", value: [""] },
    { key: "Talk Time", value: [""] },
    { key: "Fast Charging", value: [""] },
    { key: "Wireless Charging", value: [""] },
]

export const StorageDefaultData: FieldType[] = [
    { key: "Internal Memory", value: [""] },
    { key: "Memory type", value: [""] },
    { key: "Storage available for user", value: [""] },
    { key: "Expandable Memory", value: [""] },
]

export const SoftwareDefaultData: FieldType[] = [
    { key: "Operating System", value: [""] },
    { key: "Custom UI", value: [""] },
]

export const ConnectivityDefaultData: FieldType[] = [
    { key: "SIM Configuration", value: [""] },
    { key: "Network", value: [""] },
    { key: "SIM1 Bands", value: [""] },
    { key: "SIM2 Bands", value: [""] },
    { key: "Voice over LTE(VoLTE)", value: [""] },
    { key: "Wi-Fi", value: [""] },
    { key: "Wi-fi features", value: [""] },
    { key: "USB", value: [""] },
    { key: "Bluetooth", value: [""] },
    { key: "USB OTG Support", value: [""] },
    { key: "GPS", value: [""] },
    { key: "NFC Chipset", value: [""] },
    { key: "Infrared", value: [""] },
]

export const SoundDefaultData: FieldType[] = [
    { key: "Speaker", value: [""] },
    { key: "Audio Jack", value: [""] },
    { key: "Video Player", value: [""] },
]

export const SensorsDefaultData: FieldType[] = [
    { key: "Fingerprint sensor", value: [""] },
    { key: "Face Unlock", value: [""] },
    { key: "Other Sensor", value: [""] },
]