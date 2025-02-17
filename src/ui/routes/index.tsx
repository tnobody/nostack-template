import {createFileRoute} from '@tanstack/react-router'
import {Card, CardContent} from "@/ui/components/ui/card.tsx";

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

const colors = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
const tone = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

const Banner = `
  _   _      ____  _             _    
 | \\ | | ___/ ___|| |_ __ _  ___| | __
 |  \\| |/ _ \\___ \\| __/ _\` |/ __| |/ /
 | |\\  | (_) |__) | || (_| | (__|   < 
 |_| \\_|\\___/____/ \\__\\__,_|\\___|_|\\_\\
`.split('\n').filter(l => l !== '').map((l, li) => (
    <div>{[...l].map((c, ci) => (
        <span style={{color: `var(--color-${colors[li]}-${tone[Math.ceil(ci / 4)]})`}}>{c === ' ' ? <>&nbsp;</> : c}</span>
    ))}</div>
))


function RouteComponent() {

    return <div className="gap-6 flex flex-col items-center ">
        <header>
            <h1 className="text-text-low-contrast scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                Welcome to
            </h1>
        </header>

        <Card>
            <CardContent className={'py-6 flex justify-center'}>
                <div className={'flex flex-col font-mono'}>{}
                    {Banner}
                </div>
            </CardContent>
        </Card>
        <p className="text-text-high-contrast">Create a new Project</p>

        <code className="p-4 text-lg relative rounded bg-muted font-mono text-sm font-semibold">
            npx giget@latest gh:tnobody/nostack
        </code>
    </div>
}
