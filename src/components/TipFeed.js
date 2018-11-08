import React from 'react';
import '../css/tipFeed.css'
import {CardDeck} from 'reactstrap'
import Tip from './Tip'


function TipFeed(props) {
    let {userId, tips} = props
    let tipList = tips.map(tip => {
        return <Tip key={tip.id} tip={tip} userId={userId}/>
    })

    return (
        <CardDeck style={{marginBottom: "50px"}}>
            {tipList}
        </CardDeck>
    );
}

export default TipFeed;
