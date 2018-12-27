import { LightningElement, wire, track } from 'lwc';
import getPlayers from '@salesforce/apex/STM_ScoreboardController.getPlayers';

export default class scoreboard extends LightningElement {
    wiredPlayers;
    @track players;
    @track error;
    /** Apex load the Player__c's */
    @wire(getPlayers)
    wiredGetPlayers(value) {
        if(value){
            this.wiredPlayers = value;
            if (value.error) {
                this.error = value.error;
            } else if (value.data) {
                this.setPlayers(value.data);
            }
        }
        else{
            console.log('Error retrieving data from apex');
        }
        
    }

    /** Updates the players */
    setPlayers(players) {
        this.players = players.slice();
    }
}