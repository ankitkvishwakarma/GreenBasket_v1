import { motion } from "framer-motion";
import {
    ShieldCheck,
    Truck,
    MapPinned,
    Leaf,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Secure Delivery",
        description:
            "Your delivery information is securely stored and protected for every order.",
    },
    {
        icon: Truck,
        title: "Fast Checkout",
        description:
            "Select a saved address during checkout and place your order in seconds.",
    },
    {
        icon: MapPinned,
        title: "Multiple Addresses",
        description:
            "Save your Home, Office and other frequently used delivery locations.",
    },
    {
        icon: Leaf,
        title: "Eco-Friendly Delivery",
        description:
            "We optimize delivery routes to reduce fuel usage and support greener deliveries.",
    },
];

const AddressFeatures = () => {
    return (
        <section className="space-y-8">

            <div className="text-center">

                <h2 className="text-3xl font-bold text-slate-900">
                    Why Save Your Addresses?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                    Enjoy a smoother shopping experience by saving your frequently
                    used delivery locations.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {features.map((feature, index) => {

                    const Icon = feature.icon;

                    return (

                        <motion.div
                            key={feature.title}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.35,
                            }}
                            whileHover={{
                                y: -8,
                            }}
                            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-emerald-300 hover:shadow-xl"
                        >

                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition-all group-hover:bg-emerald-600">

                                <Icon className="h-8 w-8 text-emerald-600 transition-all group-hover:text-white" />

                            </div>

                            <h3 className="mb-3 text-xl font-semibold text-slate-900">

                                {feature.title}

                            </h3>

                            <p className="leading-7 text-slate-600">

                                {feature.description}

                            </p>

                        </motion.div>

                    );

                })}

            </div>

        </section>
    );
};

export default AddressFeatures;