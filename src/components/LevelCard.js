import Link from 'next/link';
import { FaBookOpen, FaFileInvoice, FaUtensils, FaImages, FaLaptopCode, FaClipboardList, FaCalculator, FaCheckDouble, FaQuoteRight, FaClock, FaStopwatch, FaSave, FaDrum, FaCloudSun, FaFilm, FaGamepad, FaQuestionCircle, FaKeyboard, FaScroll, FaStickyNote, FaMapMarkerAlt } from 'react-icons/fa';

const iconMap = {
    'fa-book-open': FaBookOpen,
    'fa-file-invoice': FaFileInvoice,
    'fa-utensils': FaUtensils,
    'fa-images': FaImages,
    'fa-laptop-code': FaLaptopCode,
    'fa-clipboard-list': FaClipboardList,
    'fa-calculator': FaCalculator,
    'fa-check-double': FaCheckDouble,
    'fa-quote-right': FaQuoteRight,
    'fa-clock': FaClock,
    'fa-stopwatch': FaStopwatch,
    'fa-save': FaSave,
    'fa-drum': FaDrum,
    'fa-cloud-sun': FaCloudSun,
    'fa-film': FaFilm,
    'fa-gamepad': FaGamepad,
    'fa-question-circle': FaQuestionCircle,
    'fa-keyboard': FaKeyboard,
    'fa-scroll': FaScroll,
    'fa-sticky-note': FaStickyNote,
    'fa-map-marker-alt': FaMapMarkerAlt,
};

export default function LevelCard({ type, id, title, subtitle, number, icon, locked }) {
    const IconComponent = icon ? iconMap[icon] : null;

    // Determine card class based on type
    let cardClass = "level-card";
    if (type === 'theory') cardClass += " card-theory";
    if (type === 'project') cardClass += " card-project";
    if (locked) cardClass += " locked";

    const href = locked ? '#' : `/player/${type}/${id}`;
    const btnText = type === 'theory' ? 'Read Theory' : type === 'project' ? 'Start Project' : 'Start Level';

    return (
        <Link href={href} className={cardClass}>
            <div className="card-number">
                {IconComponent ? <IconComponent /> : number}
            </div>
            <div className="card-info">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <span className="btn-start">{btnText}</span>
        </Link>
    );
}
