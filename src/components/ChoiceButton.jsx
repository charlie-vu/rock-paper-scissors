import { game } from "@/utils/helper";
import Ripple from "./Ripple";

export default function ChoiceButton(props) {
    const {
        className = '',
        choice = '',
        width = 0,
        ripple = false,
    } = props;
    return (
        <>
            <div className={`ratio ratio-1x1 rounded-circle ${choice ? `bg-choice-${choice}` : 'bg-transparent'} ${className}`} style={{ width: width }}>
                <div className={`bg-light rounded-circle overflow-hidden ratio ratio-1x1 top-50 start-50 translate-middle ${!choice ? 'bg-black opacity-25' : ''}`} style={{ width: "80%", height: "80%" }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <img src={game.icons[choice]} alt={choice} style={{ width: '45%' }} />
                    </div>
                </div>
                {ripple && <Ripple />}
            </div>

        </>
    )
}