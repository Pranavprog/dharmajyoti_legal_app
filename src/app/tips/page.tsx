import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const legalTips = [
    {
        title: "Always Read the Fine Print",
        content: "Never sign a document without reading it thoroughly, including all the small text. This is where important details about termination, penalties, and liability are often found."
    },
    {
        title: "Understand Key Terms",
        content: "Before you sign, make sure you understand the key terms of the agreement. If you see words like 'indemnify,' 'waiver,' or 'arbitration,' be sure you know what they mean for you."
    },
    {
        title: "Keep Copies of Everything",
        content: "Always keep a copy of any legal document you sign. Store it in a safe place, both digitally and physically if possible. This is crucial for future reference."
    },
    {
        title: "Verbal Agreements are Risky",
        content: "While some verbal agreements can be legally binding, they are very difficult to prove. Always try to get important agreements in writing to avoid future disputes."
    },
    {
        title: "Don't Be Afraid to Negotiate",
        content: "Many contracts are negotiable. If you're not comfortable with a term, ask for it to be changed. It's better to negotiate upfront than to deal with a bad term later."
    },
    {
        title: "When in Doubt, Consult a Lawyer",
        content: "AI tools like DharmaJyoti are great for initial analysis, but they are not a substitute for professional legal advice. For high-stakes situations, always consult a qualified lawyer."
    }
]

export default function TipsPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">Legal Tips & Best Practices</h1>
                <p className="text-lg md:text-xl text-foreground/80">
                    Simple advice to help you stay protected.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {legalTips.map((tip, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Lightbulb className="h-8 w-8 text-primary"/>
                            <CardTitle className="text-xl">{tip.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{tip.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
