<template>
    <div class="flagbit-memory">
        <div class="memory-container" :class="getDeckClass">
            <card :card="card" v-for="(card, id) in deck" :key="id"/>
            <div v-if="game.started === false" class="popup start">
                <div>
                    Choose a Difficulty
                    <br><br>
                    <div>
                        <button @click="startGame('easy')">Easy</button>
                        <button @click="startGame('normal')">Normal</button>
                        <button @click="startGame('hard')">Hard</button>
                    </div>
                </div>
            </div>
            <div v-if="game.won === true" class="popup win" @click="resetGame">
                <div>
                    You Won!
                    <br><br><br>You did it in {{ getTime }} Seconds.
                    <br>It took you {{game.turns}} turns to find all pairs.
                    <br><br><br>Click here to start again
                </div>
            </div>
            <div v-if="game.lost === true" class="popup lose" @click="resetGame">
                <div>
                    You lost!
                    <br><br><br>You tried your best but it wasn't enough.
                    <br><br><br>Click here to start again
                </div>
            </div>
        </div>
        <div class="game-stats">
            <div class="title">Flagbit Memory</div>
            <br>
            {{game.turns}} Turns
            <br>
            {{time}} Seconds
        </div>
    </div>
</template>

<script>
    import Card from '@vue/Components/Card';
    import GameManager from '@js/Helper/GameHelper';

    export default {
        el: '#app',

        components: {
            Card
        },

        data() {
            return {
                deck    : GameManager.deck,
                game    : GameManager.game,
                time    : 0,
                interval: null
            }
        },

        computed: {
            getTime() {
                let milliseconds = this.game.endTime - this.game.startTime;

                return new Date(milliseconds).getSeconds()
            },
            getDeckClass() {
                if (this.deck.length === 36) return 'deck-large';
                return 'deck-medium';
            }
        },

        methods: {
            startGame(difficulty) {
                GameManager.startGame(difficulty);
                this.deck = GameManager.deck;
                this.game = GameManager.game;

                this.interval = setInterval(() => { this.time++ }, 1000)
            },
            resetGame(difficulty) {
                GameManager.resetGame();
                this.deck = GameManager.deck;
                this.game = GameManager.game;
                this.time = 0;
            }
        },
        watch  : {
            'game.endTime'() {
                if (this.game.endTime !== null) {
                    clearInterval(this.interval);
                    let milliseconds = this.game.endTime - this.game.startTime;
                    this.time = new Date(milliseconds).getSeconds();
                }
            }
        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family : 'Flagbit';
        font-style  : normal;
        font-weight : 400;
        src         : url(../fonts/Flagbit.ttf) format('truetype');
    }

    body {
        font-family : Flagbit, sans-serif;
    }

    .memory-container {
        display               : grid;
        grid-template-columns : 1fr 1fr 1fr 1fr;
        grid-column-gap       : 10px;
        grid-row-gap          : 10px;
        position              : relative;
        margin                : 0 auto;
        height                : 998px;
        width                 : 998px;

        .popup {
            display          : flex;
            align-items      : center;
            justify-content  : center;
            background-color : transparentize($color-blue, 0.15);
            border-radius    : 4px;
            position         : absolute;
            top              : 0;
            right            : 0;
            left             : 0;
            bottom           : 0;
            cursor           : pointer;
            color            : $color-white;
            font-size        : 20pt;
            text-align       : center;

            &.start {
                background-color : $color-blue;
            }
        }

        &.deck-large {
            grid-template-columns : 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-column-gap       : 7px;
            grid-row-gap          : 7px;
        }
    }

    .game-stats {
        position   : fixed;
        left       : 50px;
        top        : 50px;
        border     : 1px solid $color-grey;
        text-align : center;
        padding    : 15px 30px;

        .title {
            color       : $color-blue;
            font-weight : bold;
            font-size   : 16pt;
        }
    }
</style>