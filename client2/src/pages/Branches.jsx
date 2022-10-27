import {useMemo, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Line} from 'react-chartjs-2';

export default function Branches() {
    const [branches, setBranches] = useState([
        {
            id: 1,
            name: 'Jerusalem',
            stock: {
                Chocolate: 10,
                Vanilla: 20,
                Strawberry: 30,
            },
            history: Array.from({length: 10}, (_, i) => ({
                date: new Date(+new Date('2022-10-24') + i * 24 * 60 * 60 * 1000),
                sales: {
                    Chocolate: Math.floor(Math.random() * 10),
                    Vanilla: Math.floor(Math.random() * 10),
                    Strawberry: Math.floor(Math.random() * 10),
                }
            })),
        },
        {
            id: 2,
            name: 'Tel Aviv',
            stock: {
                Chocolate: 40,
                Vanilla: 50,
                Strawberry: 60,
            },
            history: Array.from({length: 10}, (_, i) => ({
                date: new Date(+new Date('2022-10-24') + i * 24 * 60 * 60 * 1000),
                sales: {
                    Chocolate: Math.floor(Math.random() * 10),
                    Vanilla: Math.floor(Math.random() * 10),
                    Strawberry: Math.floor(Math.random() * 10),
                }
            }))
        }
    ]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    const [selectedBranch, setSelectedBranch] = useState(branches[0]);
    const dayName = (date) => {
        return new Date(date).toLocaleDateString('en-US', {weekday: 'short'});
    }

    const chartData = {
        labels: selectedBranch.history.map(h => dayName(h.date)),
        datasets: Object.entries(selectedBranch.history[0].sales).map((s, i) => ({
            label: s[0],
            data: selectedBranch.history.map(h => h.sales[s[0]]),
        }))
    }

    return (
        <>
            <div>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedBranch.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {branches.map((branch) => (
                            <Dropdown.Item
                                key={branch.id}
                                onClick={() => setSelectedBranch(branch)}
                            >
                                {branch.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{height: '500px'}}>
                <Line data={chartData} options={chartOptions}/>
            </div>
        </>
    )
}