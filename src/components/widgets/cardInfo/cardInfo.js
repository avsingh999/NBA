import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './cardInfo.css';

const CardInfo = (props) => {

   const teamName = (teams, team) => {
       let data = teams.find((item)=>{
        //    console.log("---> "+team+" "+item.id)
           return item.id == team
       })
       if(data){
           return data.name
       }
   }

    return(
        <div className={style.CardInfo}>
            <span className={style.TeamName}>
                {teamName(props.teams, props.team)}
            </span>
            <span className={style.Date}>
                <FontAwesome name="clock-o"/>
                {props.date}
            </span>
        </div>

    )
}

export default CardInfo;