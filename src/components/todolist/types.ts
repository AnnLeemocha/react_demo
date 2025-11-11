export interface Item {
    title: string;
    time: string;
    id: string;
    completed: boolean;
}

export type newItem = Omit<Item, "id" | "completed">;