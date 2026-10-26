import { useState, useEffect, useRef } from 'react';
import Exchange from './Exchange';
import './Interaction.css';

export default function Interaction({ activeScenario, setBookingData, setMembershipData }) {

    const [ scenario, setScenario ] = useState(null);
    const [ thread, setThread ] = useState([]);
    const [ checkpoint, setCheckpoint ] = useState('start');
    const [ choice, setChoice ] = useState(null);
    const [ customerDetails, setCustomerDetails ] = useState({});
    const [ isCustomerTyping, setIsCustomerTyping ] = useState(false);
    const [ qualityEvaluation, setQualityEvaluation ] = useState({});
    const [ renderNewExchange, setRenderNewExchange ] = useState(true);
    const [ scroll, setScroll ] = useState(false);
    const newTimestamp = useRef(null);

    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function quality(checkpoint){
        const qualityIncrement = scenario[checkpoint].options.find(option => option.id === Number(choice));
        const newObject = {
            ...qualityEvaluation,
            criticals: [
                ...qualityEvaluation.criticals,
                ...qualityIncrement.quality.criticals,
            ],
            markdowns: [
                ...qualityEvaluation.markdowns,
                ...qualityIncrement.quality.markdowns,
            ]
        };

        qualityIncrement.quality.markdowns.forEach(m => {
            const category = newObject.formCategories.find(c => c.id === m.categoryId);
            if (category) {
                category.achievedScore += m.score;
                if (category.achievedScore < 1){
                    category.achievedScore = 1;
                }
            }
        });

        setQualityEvaluation(newObject);
    }

    useEffect(() => {
        if (!activeScenario) return;

        fetch(`./data/scenarios/${activeScenario}`)
        .then(res => res.json())
        .then(data => {
            setThread([]);
            setCheckpoint('start');
            setCustomerDetails({
                customerSalutation: data.customerSalutation,
                customerName: data.customerName,
                customerFirstName: data.customerFirstName,
                customerLastName: data.customerLastName,
                customerBooking: data.booking.pnr,
                customerMembership: data.membership?.number ?? null,
            });
            setScenario(data.conversation);
            setQualityEvaluation(data.quality);
            setBookingData(data.booking);
            setMembershipData(data.membership);
        })
        .catch(err => {
            if (err.name === "AbortError") return;
            console.error(err);
        });

        // return () => {
        //     controller.abort();
        // };
    }, [activeScenario]);

    useEffect(() => {
        if (!choice) return;
        const newCheckpoint = scenario[checkpoint].options.find(option => option.id === Number(choice)).goto;
        console.log('newCheckpoint: ', newCheckpoint);

        let customerReadTime;
        if (newCheckpoint !== 'end') {
            customerReadTime = setTimeout(() => {
                setIsCustomerTyping(true);
            }, 2000);
        }

        const newThreadItem = {
            scenario: scenario,
            checkpoint: checkpoint,
            choice: choice,
            setChoice: setChoice,
            customerDetails: customerDetails,
            customerTimestamp: newTimestamp.current,
            agentTimestamp: updateTime(),
            firstComponentMounth: false,
        };

        // const newThreadItem = <Exchange
        //     key={checkpoint}
        //     scenario={scenario}
        //     checkpoint={checkpoint}
        //     choice={choice}
        //     setChoice={setChoice}
        //     customerDetails={customerDetails}
        //     updateTime={updateTime()}
        //     firstComponentMount={false}
        // />

        //quality
        quality(checkpoint);


        setThread((prev) => [ ...prev, newThreadItem ]);
        setRenderNewExchange(false);


        let customerReactTime;
        const messageLength = scenario[newCheckpoint]?.message?.length;
        const duration = messageLength != null ? messageLength * 75 : 2000;
        customerReactTime = setTimeout(() => {
            setCheckpoint(newCheckpoint);
            setChoice(null);
            setIsCustomerTyping(false);
            setRenderNewExchange(true);
        }, duration);

        return () => {
            clearTimeout(customerReadTime);
            clearTimeout(customerReactTime);
        }
    }, [choice]);

    useEffect(() => {
        if (!scroll) return;
        console.log('scroll triggered');
        const element = document.querySelector('.interaction');
        console.log(element.scrollHeight);
        // element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
        setScroll(false);
    }, [scroll])

    useEffect(() => {
        newTimestamp.current = updateTime();
    }, [renderNewExchange]);


    return <div className="interaction">
        {scenario &&
        <>
            <div className="chat-beginning">This is the beginning of the conversation</div>
            {thread.map(t => <Exchange key={t.checkpoint} {...t} />)}
            {renderNewExchange && <Exchange
                scenario={scenario}
                checkpoint={checkpoint}
                choice={choice}
                setChoice={setChoice}
                customerDetails={customerDetails}
                qualityEvaluation={qualityEvaluation}
                setScroll={setScroll}
                customerTimestamp={newTimestamp.current}
                firstComponentMount={true}
            />}
            {isCustomerTyping && <div className="typing">{customerDetails.customerName} is typing...</div>}
            <div className="breathe-box"></div>
        </>}
    </div>
}
