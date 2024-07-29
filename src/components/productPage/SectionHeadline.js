import { ReactComponent as SectionHeadlinesNeutral } from '../../Assets/icon/section_headlines_neutral.svg';
import { ReactComponent as SectionHeadlinesSport } from '../../Assets/icon/section_headlines_sport.svg';
import { ReactComponent as SectionHeadlinesAdventure } from '../../Assets/icon/section_headlines_adventure.svg';
import { ReactComponent as SectionHeadlinesHeritage } from '../../Assets/icon/section_headlines_heritage.svg';
import { ReactComponent as SectionHeadlinesRoadster } from '../../Assets/icon/section_headlines_roadster.svg';
import { ReactComponent as SectionHeadlinesTour } from '../../Assets/icon/section_headlines_tour.svg';
import { ReactComponent as SectionHeadlinesUrbanMobility } from '../../Assets/icon/section_headlines_urban-mobility.svg';

const SectionHeadlines = ({ type = 'sport' }) => {
    const normalizedType = type.toLowerCase();

    const getIcon = () => {
        switch (normalizedType) {
            case 'sport':
                return (
                    <SectionHeadlinesSport className="w-[240px] h-[120px]" />
                );
            case 'm':
                return (
                    <SectionHeadlinesSport className="w-[240px] h-[120px]" />
                );
            case 'adventure':
                return (
                    <SectionHeadlinesAdventure className="w-[240px] h-[120px]" />
                );
            case 'tour':
                return <SectionHeadlinesTour className="w-[240px] h-[120px]" />;
            case 'roadster':
                return (
                    <SectionHeadlinesRoadster className="w-[240px] h-[120px]" />
                );
            case 'heritage':
                return (
                    <SectionHeadlinesHeritage className="w-[240px] h-[120px]" />
                );
            case 'urban mobility':
                return (
                    <SectionHeadlinesUrbanMobility className="w-[240px] h-[120px]" />
                );
            default:
                return (
                    <SectionHeadlinesNeutral className="w-[240px] h-[120px]" />
                );
        }
    };

    return (
        <div className="flex justify-center items-center mt-2">
            <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
            {getIcon()}
            <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
        </div>
    );
};

export default SectionHeadlines;
