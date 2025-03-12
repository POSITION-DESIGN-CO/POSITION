import { getAbout } from "@/lib/contentful";
import Image from "next/image";

export default async function AboutPage() {
    const about = await getAbout();

    const getGridConfig = (item: any, index: number) => {
        const configs = [
            {
                colSpan: "md:col-span-12 lg:col-span-4 md:col-span-6",
            },
            {
                colSpan: "md:col-span-12 lg:col-span-4 md:col-span-6",
            },
        ];
        return configs[index % configs.length];
    };

    return (
        <main className="min-h-[calc(100vh-50px)] p-4">
            <div className="grid md:grid-cols-2 col-span-12 mt-96">
                <div>
                    <p className="text-sm">{about.about}</p>
                </div>
                <div className="grid md:grid-cols-12 gap-4">
                    {about.headCollection?.items.map((item, index) => {
                        const config = getGridConfig(item, index);
                        return (
                            <div className={config.colSpan}>
                                <div
                                    key={item.sys.id}
                                    className={`${config.colSpan} relative w-full h-[250px]`}
                                >
                                    <Image
                                        priority
                                        src={item.url || "/placeholder.svg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {item.title && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        {item.title}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-12">
                <div className="mt-4">
                    <p>New York / Taipei</p>
                    <p>+1(323)600-5582</p>
                    <p>pshih@positiondesign.co</p>
                    <p>Instagram</p>
                </div>
            </div>
        </main>
    );
}
