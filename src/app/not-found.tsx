import RandomNotFound from "@/components/not-found-random";

export default function NotFound() {
    const notFoundMessages = [
        "lost in the digital void",
        "page took the wrong door",
        "oops, wrong dimension",
        "the bits got scattered",
        "monsters, they come out at night",
        "nothing's here 👀",
        "you dug straight down... mistake",
        "the binary de-octal'd your hexagonal decimal",
        "map ends here, traveler",
        "the goblins stole your page",
        "stayin' alive-ive-ive (not this page tho)",
        "wake up, neo... the page is missing",
    ];

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-geist">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,var(--color-midnight-900),var(--color-midnight-900),var(--color-midnight-700))]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-mint-glow),transparent_60%)]" />


            <div className="relative z-10 flex items-center space-x-4">
                <span className="text-3xl font-bold tracking-tighter text-white">
                    404
                </span>
                <div className="h-8 w-px rotate-12 bg-neutral-400"></div>
                
                <RandomNotFound messages={notFoundMessages} />
            </div>
        </main>
    );
}