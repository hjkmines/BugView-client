import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom'; 
import 'materialize-css';
import { useHistory } from 'react-router-dom'; 
import M from 'materialize-css'; 
import { Button, Modal, Select } from 'react-materialize';
import {Doughnut, Bar, Line} from 'react-chartjs-2';

const Home = () => {
    const [data, setData] = useState([]); 
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory(); 
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    const [due, setDue] = useState(''); 
    const [github, setGithub] = useState(''); 
    const [teamMembers, setTeamMembers] = useState(''); 
    const [severity, setSeverity] = useState(''); 
    const [status, setStatus] = useState(''); 
    const [language, setFramework] = useState(''); 
    const [framework, setLanguage] = useState(''); 
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [high, setHigh] = useState([]);
    const [moderate, setModerate] = useState([]);
    const [low, setLow] = useState([]);
    const [jan, setJan] = useState([]);
    const [feb, setFeb] = useState([]);
    const [mar, setMar] = useState([]);
    const [apr, setApr] = useState([]);
    const [may, setMay] = useState([]);
    const [jun, setJun] = useState([]);
    const [jul, setJul] = useState([]);
    const [aug, setAug] = useState([]);
    const [sep, setSep] = useState([]);
    const [oct, setOct] = useState([]);
    const [nov, setNov] = useState([]);
    const [dec, setDec] = useState([]);
    
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts) 
        })
    }, [])

    useEffect(() => {
        let pendingArray = []; 
        let completedArray = []; 
        let highArray = []; 
        let moderateArray = []; 
        let lowArray = []; 
        let janArray = [];
        let febArray = [];
        let marArray = [];
        let aprArray = [];
        let mayArray = [];
        let junArray = [];
        let julArray = [];
        let augArray = [];
        let sepArray = [];
        let octArray = [];
        let novArray = [];
        let decArray = [];
        
        data.forEach((element, index, array) => {
            if (element.status === 'Pending') {
                pendingArray.push(element.status)
                setPending(pendingArray); 
            } else if (element.status === 'Completed') {
                completedArray.push(element.status)
                setCompleted(completedArray)
            }

            if (element.severity === 'High') {
                highArray.push(element.severity)
                setHigh(highArray); 
            } else if (element.severity === 'Moderate') {
                moderateArray.push(element.severity)
                setModerate(moderateArray)
            } else if (element.severity === 'Low') {
                lowArray.push(element.severity)
                setLow(lowArray)
            }

            if (element.createdAt.split('').slice(5,7).join('').toString() === '01') {
                janArray.push(element.createdAt)
                setJan(janArray); 
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '02') {
                febArray.push(element.createdAt)
                setFeb(febArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '03') {
                marArray.push(element.createdAt)
                setMar(marArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '04') {
                aprArray.push(element.createdAt)
                setApr(aprArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '05') {
                mayArray.push(element.createdAt)
                setMay(mayArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '06') {
                junArray.push(element.createdAt)
                setJun(junArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '07') {
                julArray.push(element.createdAt)
                setJul(julArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '08') {
                augArray.push(element.createdAt)
                setAug(augArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '09') {
                sepArray.push(element.createdAt)
                setSep(sepArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '10') {
                octArray.push(element.createdAt)
                setOct(octArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '11') {
                novArray.push(element.createdAt)
                setNov(novArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '12') {
                decArray.push(element.createdAt)
                setDec(decArray)
            }
        })

    }, [data])
    
    const statusChart = {
        labels: [
            'Completed',
            'Pending'
        ],
        datasets: [{
            data: [completed.length, pending.length],
            backgroundColor: [
                'green', 
                '#FFCE56' 
            ],
            hoverBackgroundColor: [
                'green', 
                '#FFCE56' 
            ]
        }]
    };

    const severityChart = {
        labels: ['High', 'Moderate', 'Low'],
        datasets: [
          {
            // label: ['High', 'Moderate', 'Low'],
            backgroundColor: ['#B22222','green', 'yellow'], 
            borderColor: ['#DC143C', '#90EE90', '#F0E68C'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(205, 92, 92, 0.4)', '#90EE90', '#F0E68C'],
            hoverBorderColor: ['#DC143C','#90EE90', '#F0E68C'],
            data: [high.length, moderate.length, low.length]
          }
        ]
      };

      const postedTicket = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            // label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [jan.length, feb.length, mar.length, apr.length, may.length, jun.length, jul.length, aug.length, sep.length, oct.length, nov.length, dec.length]
          }
        ]
      };

    const updateDetails = () => {

        fetch('/createpost', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                title, 
                body, 
                due, 
                github, 
                teamMembers, 
                severity, 
                status, 
                language, 
                framework
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log(data)
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                M.toast({ html: 'Ticket Submitted Successfully', classes: '#43a047 green darken-1' })
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const likePost = (id) => {
        fetch('/like', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId: id 
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id) {
                    return result 
                } else {
                    return item 
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId, 
                text
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id) {
                    return result 
                } else {
                    return item 
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: 'DELETE', 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id 
            })
            setData(newData)
        })
    }

    return (
        <div>
            <div style={{fontSize: '30px', textAlign: 'center', fontSize: '40px', marginTop: '10px'}}>
            <strong>Dashboard</strong>
            </div>
        <div style={{margin: '20px 20px 20px 20px', borderRadius: '30px', border: '10px solid #73AD21'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
                <div style={{ textAlign: 'center' }}>
                <span><strong>Ticket Severities</strong></span>
                <Bar
                data={severityChart}
                width={400}
                height={100}
                options={{
                maintainAspectRatio: false, 
                legend: false 
                }}
                />
                </div>
                <div style={{ textAlign: 'center' }}>
                <span><strong>Ticket Status</strong></span>
                <Doughnut 
                data={statusChart}
                width={300}
                height={100}
                options={{ maintainAspectRatio: false }}
                />
                </div>
                <div style={{ textAlign: 'center' }}>
                <span><strong># of tickets posted/month</strong></span>
                <Line 
                data={postedTicket}
                width={400}
                height={100}
                options={{
                maintainAspectRatio: false, 
                legend: false 
                }}
                />
                </div>
            </div>
        </div>
        <div className='home'>
            {
                data.map( item => {
                    return (
                        <div className='card home-card' key={item._id}>
                            <div style={{ textAlign: 'center', backgroundColor: item.severity === 'High' ? 'red' : item.severity === 'Moderate' ? 'green' : item.severity === 'Low' ? 'yellow' : null, height: '25px' }}><span><strong>Ticket #: </strong>{item._id}</span></div>
                            <h5 style={{ textAlign: 'center' }}>{item.title}</h5> 
                            <h5 style={{ marginLeft: '10px', textAlign: 'center' }}><strong>Posted By: </strong> <Link to={item.postedBy._id !== state._id ? ('/profile/' + item.postedBy._id) : '/profile'}>{item.postedBy.firstName} {item.postedBy.lastName}</Link> {item.postedBy._id == state._id 
                            && <i 
                                className="material-icons" 
                                style={{ float: 'right', marginRight: '15px'}}
                                onClick={() => deletePost(item._id)}
                                >
                                delete
                            </i>
                            }
                            </h5>
                            <div className='card-image'>
                            
                            </div>
                            <div className='card-content' style={{paddingTop: '0'}}>
                                <h6 style={{textAlign: 'center'}}><strong>Posted At: </strong>{(item.createdAt).toString().split('').slice(11,19)} {(item.createdAt).toString().split('').slice(0,10)}</h6>
                                <h6 style={{textAlign: 'center'}}><strong>Last Update: </strong>{(item.updatedAt).toString().split('').slice(11,19)} {(item.updatedAt).toString().split('').slice(0,10)}</h6>
                                <br/>
                                <h6 style={{textAlign: 'center'}}><strong>Status: </strong>{item.status === 'Pending' ? <span>⌛</span> : item.status === 'Completed' ? <span>✔️</span> : null} {item.status}</h6>
                                {item.postedBy._id == state._id 
                                &&  
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Close</Button>
                                    ]}
                                    style={{textAlign: 'center', height: '700px'}}
                                    bottomSheet={false}
                                    fixedFooter
                                    header="Update Ticket"
                                    id="Modal-0"
                                    open={false}
                                    options={{
                                        dismissible: true,
                                        endingTop: '10%',
                                        inDuration: 250,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        opacity: 0.5,
                                        outDuration: 250,
                                        preventScrolling: true,
                                        startingTop: '4%'
                                    }}
                                    // root={[object HTMLBodyElement]}
                                    trigger={<div style={{ display: 'flex', justifyContent: 'center' }}><Button node="button">Update Ticket</Button></div>}
                                    >
                                

                                    <div 
                                    className='card input-filled'
                                    style={{
                                        margin: '30px auto', 
                                        maxWidth: '1200px', 
                                        padding: '20px', 
                                        textAlign: 'center', 
                                        marginTop: '25px'
                                    }}
                                >
                                    {/* <div style={{fontSize: '30px', marginBottom: '10px'}}><strong>Update Ticket</strong></div> */}
                                    <input 
                                        type='text' 
                                        // placeholder={item.due}
                                        // default={item.due}
                                        value={item.due !== due ? item.due : due}
                                        onChange={(e) => setDue(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    /> 
                                    <input 
                                        type='text' 
                                        value={item.title !== title ? item.title : title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        value={item.body !== body ? item.body : body}
                                        onChange={(e) => setBody(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        value={item.github !== github ? item.github : github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        placeholder={item.teamMembers}
                                        value={item.teamMembers !== teamMembers ? item.teamMembers : teamMembers}
                                        onChange={(e) => setTeamMembers(e.target.value)}
                                        style={{marginBottom: '10px'}}
                                    />
                                        <Select
                                            id="Select-9"
                                            style={{marginBottom: '25px'}}
                                            multiple={false}
                                            onChange={function noRefCheck(){}}
                                            options={{
                                                classes: '',
                                                dropdownOptions: {
                                                alignment: 'left',
                                                autoTrigger: true,
                                                closeOnClick: true,
                                                constrainWidth: true,
                                                coverTrigger: true,
                                                hover: false,
                                                inDuration: 150,
                                                onCloseEnd: null,
                                                onCloseStart: null,
                                                onOpenEnd: null,
                                                onOpenStart: null,
                                                outDuration: 250
                                                }
                                            }}
                                            value=""
                                            value={severity}
                                            onChange={(e) => setSeverity(e.target.value)}
                                            >
                                            <option
                                                disabled
                                                value=""
                                            >
                                             {item.severity !== severity ? item.severity : severity}
                                            </option>
                                            <option value="High">🔴 High</option>
                                            <option value="Moderate">🟢 Moderate</option>
                                            <option value="Low">🟡 Low</option>
                                        </Select>
                                        <Select
                                            id="Select-9"
                                            style={{marginBottom: '25px'}}
                                            multiple={false}
                                            onChange={function noRefCheck(){}}
                                            options={{
                                                classes: '',
                                                dropdownOptions: {
                                                alignment: 'left',
                                                autoTrigger: true,
                                                closeOnClick: true,
                                                constrainWidth: true,
                                                coverTrigger: true,
                                                hover: false,
                                                inDuration: 150,
                                                onCloseEnd: null,
                                                onCloseStart: null,
                                                onOpenEnd: null,
                                                onOpenStart: null,
                                                outDuration: 250
                                                }
                                            }}
                                            value=""
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            >
                                            <option
                                                disabled
                                                value=""
                                            >
                                             {item.status !== status ? item.status : status}
                                            </option>
                                            <option value="Pending">⌛ Pending</option>
                                            <option value="Completed">✔️ Completed</option>
                                        </Select>
                                    <button 
                                        className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                                        onClick={() => updateDetails()}
                                    >
                                        Submit Ticket 
                                    </button>
                                </div>
                                </Modal>
                            }
                                <h6><strong>Deadline: </strong>{item.due}</h6>
                                <h6><strong>Source Code: </strong><a href={item.github}>{item.github}</a></h6>
                                <h6><strong>Severity: </strong>{item.severity} {item.severity === 'High' ? <span>🔴</span> : item.severity === 'Moderate' ? <span>🟢</span> : item.severity === 'Low' ? <span>🟡</span> : null}</h6>
                                <h6><strong>Team Members: </strong>{item.teamMembers}</h6>
                                <h6><strong>Ticket Summary: </strong>{item.body}</h6>
                                {/* <p>{item.likes.length} likes</p> */}
                                <div id="modal1" class="modal">
                                    <div class="modal-content">
                                        <h4>Modal Header</h4>
                                        <p>A bunch of text</p>
                                    </div>
                                    <div class="modal-footer">
                                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                                    </div>
                                </div>
                                <form onSubmit={(e) => {
                                    // e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='Add a comment' /> 
                                </form>
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Close</Button>
                                    ]}
                                    bottomSheet={false}
                                    fixedFooter
                                    header="Comments"
                                    id="Modal-0"
                                    open={false}
                                    style={{marginBottom: '20px'}}
                                    options={{
                                        dismissible: true,
                                        endingTop: '10%',
                                        inDuration: 250,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        opacity: 0.5,
                                        outDuration: 250,
                                        preventScrolling: true,
                                        startingTop: '4%'
                                    }}
                                    // root={[object HTMLBodyElement]}
                                    trigger={<div style={{ display: 'flex', justifyContent: 'center' }}><Button node="button">{item.comments.length} Comments</Button></div>}
                                    >
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: '500', marginTop: '10px', marginBottom: '10px' }}>{record.postedBy.firstName} {record.postedBy.lastName}:</span> {record.text}</h6>
                                        )
                                    })
                                }
                                </Modal>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}; 

export default Home; 

