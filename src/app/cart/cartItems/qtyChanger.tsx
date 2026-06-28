import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface IProps {
    handleQtyChange: (qty: number) => void;
    children: React.ReactNode;
}

const QtyChanger = ({ handleQtyChange, children }: IProps) => {
    return (
        <div className="flex items-center bg-background/50 border border-border rounded-full p-0.5 shadow-inner transition-colors duration-300">
            <button
                onClick={() => {
                    handleQtyChange(-1);
                }}
                className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-center transition-all duration-150">
                <Minus size={14} />
            </button>
            <div className="w-8 text-center text-sm font-semibold text-foreground transition-colors duration-300">{children}</div>
            <button
                onClick={() => {
                    handleQtyChange(1);
                }}
                className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-center transition-all duration-150">
                <Plus size={14} />
            </button>
        </div>
    );
};

export default QtyChanger;
