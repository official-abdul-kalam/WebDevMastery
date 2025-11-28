import LevelCard from './LevelCard';

export default function ModuleSection({ title, subtitle, items }) {
    return (
        <div className="levels-grid">
            <div className="module-header">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            {items.map((item, index) => (
                <LevelCard key={index} {...item} />
            ))}
        </div>
    );
}
