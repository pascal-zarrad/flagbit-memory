<template>
    <div class="flagbit-memory">
        <div :class="getDeckClass" class="memory-container">
            <card :card="card" :key="id" v-for="(card, id) in deck"/>
            <div class="popup start" v-if="game.started === false">
                <div v-if="features === 'full'">
                    <div>
                        <label for="game-user">Name</label><br>
                        <input id="game-user" type="text" v-model="user"/>
                    </div>
                    <div>
                        <br>Difficulty<br>
                        <button :disabled="user.length < 3" @click="startGame('easy')">Easy</button>
                        <button :disabled="user.length < 3" @click="startGame('normal')">Normal</button>
                        <button :disabled="user.length < 3" @click="startGame('hard')">Hard</button>
                    </div>
                </div>
                <div v-else>
                    <div>
                        <button @click="startGame('easy')">Start Game</button>
                    </div>
                </div>
            </div>
            <div class="popup win" v-if="game.won === true">
                <div>
                    You Won!
                    <br><br><br>You did it in {{ time }} Seconds.
                    <br>It took you {{game.turns}} turns to find all pairs.
                    <br><br><br>
                    <button @click="resetGame">Click here to start again</button>
                </div>
            </div>
            <div @click="resetGame" class="popup lose" v-if="game.lost === true">
                <div>
                    You lost!
                    <br><br><br>You tried your best but it wasn't enough.
                    <br><br><br>
                    <button @click="resetGame">Click here to start again</button>
                </div>
            </div>
            <div class="popup locked" v-if="game.locked === true">
            </div>
        </div>
        <div class="game-stats">
            <div class="title">Flagbit Memory</div>
            <br>
            {{game.turns}} Turns
            <br>
            {{time}} Seconds
            <!-- Changes for highscore -->
            <br><br>
            <div v-if="statistics && statistics.highscoreStatistics && statistics.highscoreStatistics.game[0]">
                <div class="title">Highscore</div>
                <br>
                <b>Easy:</b>
                <br>
                User: {{statistics.highscoreStatistics.game[0].users[0].username}}
                <br>
                {{statistics.highscoreStatistics.game[0].users[0].turns}} Turns
                <br>
                {{statistics.highscoreStatistics.game[0].users[0].timeRequired}} Seconds
                <br><br>
                <b>Normal:</b>
                <br>
                User: {{statistics.highscoreStatistics.game[1].users[0].username}}
                <br>
                {{statistics.highscoreStatistics.game[1].users[0].turns}} Turns
                <br>
                {{statistics.highscoreStatistics.game[1].users[0].timeRequired}} Seconds
                <br><br>
                <b>Hard:</b>
                <br>
                User: {{statistics.highscoreStatistics.game[2].users[0].username}}
                <br>
                {{statistics.highscoreStatistics.game[2].users[0].turns}} Turns
                <br>
                {{statistics.highscoreStatistics.game[2].users[0].timeRequired}} Seconds
            </div>
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
                features: GameManager.features,
                deck: GameManager.deck,
                game: GameManager.game,
                user: '',
                time: 0,
                interval: null,
                statistics: GameManager.statsManager
            }
        },

        computed: {
            getDeckClass() {
                if (this.deck.length === 36) return 'deck-large';
                return 'deck-medium';
            }
        },

        methods: {
            startGame(difficulty) {
                if (GameManager.startGame(difficulty, this.user)) {
                    this.deck = GameManager.deck;
                    this.game = GameManager.game;

                    this.interval = setInterval(() => {
                        this.time++
                    }, 1000)
                }
            },
            resetGame() {
                GameManager.resetGame();
                this.deck = GameManager.deck;
                this.game = GameManager.game;
                this.time = 0;
            }
        },
        watch: {
            'game.endTime'() {
                if (this.game.endTime !== null) {
                    clearInterval(this.interval);
                }
            }
        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family: 'Flagbit';
        font-style: normal;
        font-weight: 400;
        src: url(../fonts/Flagbit.ttf) format('truetype');
    }

    body {
        font-family: Flagbit, sans-serif;
    }

    .memory-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        position: relative;
        margin: 0 auto;
        height: 998px;
        width: 998px;

        .popup {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparentize($color-blue, 0.15);
            border-radius: 4px;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            color: $color-white;
            font-size: 20pt;
            text-align: center;

            &.start {
                background-color: $color-blue;
            }

            &.locked {
                background-color: transparentize($color-blue, 0.75);
            }
        }

        &.deck-large {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-column-gap: 7px;
            grid-row-gap: 7px;
        }

        input,
        button {
            background-color: $color-white;
            color: $color-blue;
            font-family: Flagbit, sans-serif;
            padding: 15px 15px 13px;
            border: none;
            border-radius: 5px;
            font-size: 12pt;

            &:disabled {
                background-color: $color-grey;
                cursor: default;
            }
        }

        button {
            cursor: pointer;
        }
    }

    .game-stats {
        position: fixed;
        left: 50px;
        top: 50px;
        border: 1px solid $color-grey;
        text-align: center;
        padding: 15px 30px;
        background: transparentize($color-white, 0.5);

        .title {
            color: $color-blue;
            font-weight: bold;
            font-size: 16pt;
        }
    }
</style>