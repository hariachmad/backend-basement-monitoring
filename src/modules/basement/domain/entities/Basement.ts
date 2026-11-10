import { IEvent } from "../../../shared/events/IEvent.js";
import { BasementId } from "../value-object/BasementId.js";

export class Basement {
    private readonly id: BasementId;
    private name: string;
    private capacity: number;
    private currentCount: number;
    private updatedAt: Date;
    private events: IEvent<any, any>[] = [];


    constructor(id: BasementId, name: string, capacity: number, currentCount: number) {
        if (capacity <= 0) {
            throw new Error("capacity must be greater than 0");
        }

        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.currentCount = currentCount;
        this.updatedAt = new Date();
    }

    public pullEvents(): IEvent<any, any>[] {
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
                reason: "in",
                occurredAt: this.updatedAt,
            }
        });

        this.events.push({
            name: "basement.entered",
            payload: {
                basementId: this.id,
                timestamp: new Date(),
            }
        })
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
                reason: "in",
                occurredAt: this.updatedAt,
            }
        });

        this.events.push({
            name: "basement.leaved",
            payload: {
                basementId: this.id,
                timestamp: new Date(),
            }
        })
    }

    get isFull(): boolean { return this.currentCount >= this.capacity; }
    get available(): number { return Math.max(this.capacity - this.currentCount, 0); }

    public hasIntialized(): boolean {
        const toDateKey = (date: Date) =>
            date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

        return toDateKey(this.updatedAt) === toDateKey(new Date());
    }


}