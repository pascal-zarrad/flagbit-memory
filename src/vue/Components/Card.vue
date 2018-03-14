<template>
    <div class="memory-card" :class="{active:card.show}" @click="showCard">
        <div class="flipper">
            <div class="front"></div>
            <div class="back" :style="getImage"></div>
        </div>
    </div>
</template>

<script>
    import GameManager from '@js/Helper/GameHelper';

    export default {
        props: {
            card: Object
        },

        computed: {
            getImage() {
                return {
                    backgroundImage: 'url(/img/card-' + this.card.image + '.png)'
                }
            }
        },

        methods: {
            showCard() {
                GameManager.showCard(this.card.id);
            }
        }
    }
</script>

<style lang="scss">
    .memory-card {
        width       : 240px;
        height      : 240px;
        border      : 1px solid $color-grey;
        perspective : 1000px;

        .front,
        .back {
            width               : 240px;
            height              : 240px;
            background-repeat   : no-repeat;
            background-position : center;
            background-size     : cover;
            backface-visibility : hidden;
            position            : absolute;
            top                 : 0;
            left                : 0;
        }

        .front {
            background-image : url(/img/card-back.png);
            z-index          : 2;
            transform        : rotateY(0deg);
        }

        .back {
            transform : rotateY(180deg);
        }

        .flipper {
            transition      : 0.6s;
            transform-style : preserve-3d;
            position        : relative;
        }

        &.active .flipper {
            transform : rotateY(180deg);
        }
    }

    .deck-large {
        .back,
        .front,
        .memory-card {
            width  : 158px;
            height : 158px;
        }
    }
</style>