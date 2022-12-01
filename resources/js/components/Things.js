import React, {useEffect, useState} from 'react';
import '../../css/Things.css';

const Things = ({things, setThings, client}) => {
    const toggleButton = (thing) => {
        client.publish(`/${thing.name}/led`, (thing.led === '-1')? "1" : (parseInt(thing.led)? "0" : "1"))
    }
   
    useEffect(() => {
            setThings(things)
      }, [things]);

    return (
        <div className='things'>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Things List </h5>
                {
                    (things.length > 0)
                    ? things.map(thing => (
                        <div key = {thing._id}>
                            <h6 className="card-subtitle mb-2 text-muted"> Name: {thing.name} </h6>
                            <div className='modules'>
                                {(thing.led === 'null')? '' : (
                                    <>  
                                        <p> Light: {(thing.led === '-1')? 'not set' : thing.led} </p>
                                        <button onClick={() => toggleButton(thing)}> Toggle </button>
                                    </>
                                ) }
                                {(thing.sound === 'null')? '' : <p> Sound: {(thing.sound === '-1')? 'not set' : thing.sound} </p> }
                                {(thing.temp === 'null')? '' : <p> Temperature: {(thing.temp === '-1')? 'not set' : thing.temp} </p> }
                                {(thing.motion === 'null')? '' : <p> Motion: {(thing.motion === '-1')? 'not set' : thing.motion} </p> }
                                {(thing.heart === 'null')? '' : <p> Heart rate: {(thing.heart === '-1')? 'not set' : thing.heart} </p> }
                            </div>
                        </div>
                    ))
                    : <h6 className="card-subtitle mb-2 text-muted"> No Things Registered </h6>
                }
                </div>
            </div>
        </div>
    );
}

export default Things;