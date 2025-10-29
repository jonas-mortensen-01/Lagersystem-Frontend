export default interface InventoryEntry {
    productId: string;
    locationId: string;
    available: number;
    reserved: number;
}