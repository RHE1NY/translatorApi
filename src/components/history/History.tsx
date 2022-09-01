import React from 'react';
import {useAppSelector} from "../store";
import './history.css'
const History = () => {
    const historyList = useAppSelector(state => state.history.historyList)
    return (
        <div className="history-section">
            {historyList.length
            ?
                <div className="history-value">
                    {historyList.map((historyItem) =>
                        <>
                            <div>
                                {historyItem.fromLanguage.name} {"→"} {historyItem.targetLanguage.name}
                            </div>
                            <div className={"history-value-translate"}>
                                {historyItem.textToTranslate}
                            </div>
                            <div className="history-value-translated">
                                {historyItem.translatedText}
                            </div>
                        <hr/>
                        </>
                    )}

                </div>
                :
                <h4>
                    История пуста
                </h4>
            }
        </div>
    );
};

export default History;
