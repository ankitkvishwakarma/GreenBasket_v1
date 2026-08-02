import { motion } from "framer-motion";

import {
    ShoppingBag,
    SearchX,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const OrderEmpty = ({
    type = "no-orders",
}) => {

    const navigate = useNavigate();

    const config = {

        "no-orders": {

            icon: ShoppingBag,

            title: "No Orders Yet",

            description:
                "Looks like you haven't placed any grocery orders yet. Start shopping to fill your pantry with fresh products.",

            button: "Start Shopping",

        },

        "no-results": {

            icon: SearchX,

            title: "No Matching Orders",

            description:
                "We couldn't find any orders matching your search or selected filters. Try changing your filters.",

            button: "Clear Filters",

        },

    };

    const data =
        config[type] ||
        config["no-orders"];

    const Icon = data.icon;

    const handleClick = () => {

        if (type === "no-orders") {

            navigate("/");

            return;

        }

        window.location.reload();

    };

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            className="rounded-3xl border border-dashed border-slate-300 bg-white py-20"

        >

            <div className="mx-auto flex max-w-md flex-col items-center text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                    <Icon
                        size={42}
                        className="text-green-600"
                    />

                </div>

                <h2 className="mt-8 text-2xl font-bold text-slate-900">

                    {data.title}

                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">

                    {data.description}

                </p>

                <Button
                    onClick={handleClick}
                    className="mt-8 rounded-xl bg-green-600 hover:bg-green-700"
                >

                    {data.button}

                    <ArrowRight
                        size={16}
                        className="ml-2"
                    />

                </Button>

            </div>

        </motion.div>

    );

};

export default OrderEmpty;