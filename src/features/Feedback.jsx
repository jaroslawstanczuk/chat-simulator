import { useEffect, useState } from 'react';
import './Feedback.css';

export default function Feedback({ qualityEvaluation }){

    const [ qaScore, setQaScore ] = useState(0);

    useEffect(() => {
        console.log(qualityEvaluation);
        const numerator = qualityEvaluation.formCategories.reduce((acc, qaEval) => acc + qaEval.achievedScore, 0);
        const denominator = qualityEvaluation.formCategories.reduce((acc, qaEval) => acc + qaEval.maxScore, 0);
        setQaScore(numerator / denominator);
    }, [])

    return (
        <div className="feedback-screen">
            <h2>Quality Evaluation {(qaScore * 100).toFixed(2)}%</h2>
            <div>
                <table className="eval-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Points scored</th>
                            <th>Max points</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qualityEvaluation.formCategories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.categoryName}</td>
                                <td>{category.achievedScore}</td>
                                <td>{category.maxScore}</td>
                                <td>{category.maxScore > 0 ? category.achievedScore * 100/ category.maxScore + '%' : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4>Markdowns:</h4>
                {qualityEvaluation.markdowns.map(markdown => <div>
                    {markdown.category} - {markdown.description}
                </div>)}
            </div>
            <div>
                <h4>Criticals:</h4>
                <div>
                    {qualityEvaluation.criticals.map(critical => <div>
                        {critical.category} - {critical.description}
                    </div>)}
                </div>
            </div>
        </div>
    );
}