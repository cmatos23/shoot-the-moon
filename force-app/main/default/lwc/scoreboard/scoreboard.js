import { LightningElement, wire, track } from 'lwc';
import getPlayers from '@salesforce/apex/STM_ScoreboardController.getPlayers';
import savePlayers from '@salesforce/apex/STM_ScoreboardController.savePlayers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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

    handleScoreUp(event){
        let player = this.players.find(player => event.detail === player.Id);
        this.findAndUpdatePlayerScore(player.Id, player.Score__c + 1);
    }
    findAndUpdatePlayerScore(playerId, score){
        this.players = this.players.map(function(aPlayer) {
            if(aPlayer.Id == playerId){
                let clonedPlayer = Object.assign({}, aPlayer);
                clonedPlayer.Score__c = score;
                return clonedPlayer;
            }
            return aPlayer;
        });
    }
    handleScoreDown(event){
        let player = this.players.find(player => event.detail === player.Id);
        this.findAndUpdatePlayerScore(player.Id, player.Score__c - 1);
    }
    handleSaveClick(){
        savePlayers({players:this.players})
            .then(()=>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message:'Successfully saved!',
                    variant:'success'
                }));
            })
            .catch(error=>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message:'Failed to save!',
                    variant:'error'
                }));
            });
    }
}