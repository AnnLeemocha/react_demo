import { useState, useEffect, useId } from "react";
import type { Item, newItem } from "./types";

interface ModalProps {
    open: boolean;
    // type: "ADD" | "EDIT";
    onClose: () => void;
    onConfirm: (data: newItem, editId?: string) => void;
    editItem?: Item | null;
}

export function TodoModal({
    open,
    // type, 
    onClose,
    onConfirm,
    editItem
}: ModalProps) {
    const id = useId();
    const [formItem, setFormItem] = useState({
        title: editItem?.title ?? "",
        time: editItem?.time ?? "",
    });

    useEffect(() => {
        if (editItem) {
            setFormItem({ title: editItem.title, time: editItem.time });
        } else {
            setFormItem({ title: "", time: "" });
        }
    }, [editItem]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormItem((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onConfirm(formItem, editItem?.id);
        onClose();
    }

    return (
        <div className={`modal ${open ? '' : 'hidden'}`}>
            <div className="modal-content">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{editItem ? "修改待辦項目" : "新增待辦項目"}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-transparent border-none text-2xl p-0"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 text-start">
                    <label htmlFor="title" className="block text-md font-bold">
                        標題
                    </label>
                    <input
                        id={`${id}-title`}
                        name="title"
                        type="text"
                        className="w-full mt-1 mb-2"
                        placeholder="輸入待辦事項"
                        value={formItem.title}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="time" className="block text-md font-bold">
                        日期
                    </label>
                    <input
                        id={`${id}-time`}
                        name="time"
                        type="datetime-local"
                        className="w-full mt-1 mb-2"
                        value={formItem.time}
                        onChange={handleChange}
                        required
                    />
                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} >取消</button>
                        <button type="submit" >確定</button>
                    </div>
                </form>
            </div>
        </div>
    );
}