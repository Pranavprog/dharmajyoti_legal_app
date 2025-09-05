import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">About DharmaJyoti</h1>
                    <p className="text-lg md:text-xl text-foreground/80">
                        Empowering you to understand the law.
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
                                <Scale className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-center text-3xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg text-foreground/90 space-y-6 text-center leading-relaxed">
                        <p>
                            DharmaJyoti was born from a simple idea: legal documents should be accessible to everyone, not just lawyers. We believe that understanding your rights, responsibilities, and the agreements you enter into is a fundamental need in today's world.
                        </p>
                        <p>
                            Our mission is to demystify legal language using the power of cutting-edge AI. We provide tools that translate complex jargon into plain English, highlight potential risks, and empower you to make informed decisions with confidence.
                        </p>
                        <p>
                            Whether you're a small business owner reviewing a contract, a freelancer signing an agreement, or just curious about a legal document, DharmaJyoti is your trusted partner in navigating the complexities of the law.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
