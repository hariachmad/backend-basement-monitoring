import { BasementEvent } from "../../../shared/types/BasementEvent.js";
import { BasementId } from "../value-object/BasementId.js";

export class Basement {
    private readonly id: BasementId;
    private name: string;
    private capacity: number;
    private currentCount: number;
    private updatedAt: Date;
    private events: BasementEvent[] = [];

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

    public pullEvents(): BasementEvent[] {
        const pulled = this.events;
        this.events = [];
        return pulled;
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

    public getCurrentCount() {
        return this.currentCount;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }

    public edit(
        name: string,
        capacity: number,
    ) {
        this.name = name;
        this.capacity = capacity;
        this.updatedAt = new Date();

        this.events.push({
            name: "basement.edited",
            payload: {
                basementId: this.id,
                nameValue: name,
                capacity,
                occurredAt: this.updatedAt,
            }

        });
    }

    public initial(currentCount: number) {
        const previousCount = this.currentCount;
        this.currentCount = currentCount;
        this.updatedAt = new Date();

        this.events.push({
            name: "basement.count-changed",
            payload: {
                basementId: this.id,
                previousCount,
                currentCount: this.currentCount,
                reason: "INITIAL",
                occurredAt: this.updatedAt,
            }
        });

    }

    public registerIn() {
        const previousCount = this.currentCount;
        this.currentCount += 1;
        this.updatedAt = new Date();

        this.events.push({
            name: "basement.count-changed",
            payload: {
                basementId: this.id,
                previousCount,
                currentCount: this.currentCount,
                reason: "IN",
                occurredAt: this.updatedAt,
            }

        });
    }

    public registerOut() {
        const previousCount = this.currentCount;
        if (this.currentCount === 0) {
            return;
        }
        this.currentCount -= 1;
        this.updatedAt = new Date();

        this.events.push({
            name: "basement.count-changed",
            payload: {
                basementId: this.id,
                previousCount,
                currentCount: this.currentCount,
                reason: "IN",
                occurredAt: this.updatedAt,
            }
        });
    }

    get isFull(): boolean { return this.currentCount >= this.capacity; }
    get available(): number { return Math.max(this.capacity - this.currentCount, 0); }

    public hasIntialized(): boolean {
        const toDateKey = (date: Date) =>
            date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

        return toDateKey(this.updatedAt) === toDateKey(new Date());
    }


}