import { BasementId } from "../value-object/BasementId.js";

export class Basement {
    private readonly id: BasementId;
    private name: string;
    private capacity: number;
    private currentCount: number;
    private updatedAt: Date;

    constructor(id: BasementId, name: string, capacity: number) {
        if (capacity <= 0) {
            throw new Error("capacity must be greater than 0");
        }

        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.currentCount = 0;
        this.updatedAt = new Date();
    }

    public getId(): BasementId {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getCapacity() {
        return this.capacity;
    }

    public getCurrentCount(){
        return this.currentCount;
    }

    public getUpdatedAt(){
        return this.updatedAt;
    }

    public edit(
        name: string,
        capacity: number,
    ) {
        this.name = name;
        this.capacity = capacity;
        this.updatedAt = new Date();
    }

    public initial(currentCount: number) {
        this.currentCount = currentCount;
        this.updatedAt = new Date();

    }

    public registerIn() {
        this.currentCount += 1;
        this.updatedAt = new Date();
    }

    public registerOut() {
        if (this.currentCount === 0) {
            return;
        }
        this.currentCount -= 1;
        this.updatedAt = new Date();
    }

    get isFull(): boolean { return this.currentCount >= this.capacity; }
    get available(): number { return Math.max(this.capacity - this.currentCount, 0); }

    public hasIntialized(): boolean {
        const toDateKey = (date: Date) =>
            date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

        return toDateKey(this.updatedAt) === toDateKey(new Date());
    }


}