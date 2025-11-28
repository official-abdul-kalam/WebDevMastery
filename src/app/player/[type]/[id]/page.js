import PlayerClient from '@/components/PlayerClient';

export function generateStaticParams() {
    return []; // Dynamic rendering for now
}

export default function PlayerPage() {
    return <PlayerClient />;
}
