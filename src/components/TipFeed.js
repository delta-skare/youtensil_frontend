import React from 'react';
import '../css/tipFeed.css'
import {Col, CardDeck, CardColumns} from 'reactstrap'
import Tip from './Tip'


function TipFeed(props) {
    let {userId, tips} = props
    let tipList = tips.map(tip => {
        return <Tip key={tip.id} tip={tip} userId={userId}/>
    })

    return (

        <CardColumns style={{marginBottom: "50px"}} size="sm">
            {tipList}
        </CardColumns>

    );
}

export default TipFeed;
