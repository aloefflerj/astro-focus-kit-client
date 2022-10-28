import { useState } from 'react';
import { Card } from '../components/Card/Card';
import { Timeline } from '../components/Timeline/Timeline';
import { TimelineElement } from '../components/Timeline/TimelineElement';
import { DashboardLayoutPage } from './DashboardLayoutPage';

export function JournalPage() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <DashboardLayoutPage>
            <h1>Your Tasks by Week</h1>
            <Timeline>
                <TimelineElement 
                    setShowDetails={setShowDetails}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <span>10 Jan » 17 Jan</span>
                        {showDetails && (
                            <div>
                                <span style={{ paddingLeft: '12px' }}>8 Finished Tasks</span>
                                <span style={{ paddingLeft: '12px' }}>2 Unfinished Tasks</span>
                            </div>
                        )}
                    </div>
                </TimelineElement>
            </Timeline>
        </DashboardLayoutPage>
    );
}
