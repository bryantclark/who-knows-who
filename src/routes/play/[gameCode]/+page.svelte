<script lang="ts">
    import { onMount } from 'svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import { get, ref, remove } from 'firebase/database';
    import { db } from '../../../firebase/firebase';
    import GraphScore from "../../GraphScore.svelte";

    let { data, form } = $props<{
        data: {
            question?: string
            questionType?: string
            answerer?: string
        }
        form: {
            success?: boolean
            message?: string
            error?: string
        }
    }>();

    let gameCode = $state('');
    let playerName = $state('');
    let formSubmitted = $state(false);
    let submitting = $state(false);
    let message: string | null = $state(null);

    onMount(() => {
        gameCode = localStorage.getItem('gameCode') || ''
        playerName = localStorage.getItem('playerName') || ''
    })

    $effect(() => {
        if (form?.success) {
            formSubmitted = true
            message = form.message ?? null
        }
    });

    async function resetForm() {
        try {
            const roundStatus: string = (await get(ref(db, `gamecode/${gameCode}/roundStatus/`))).val()
            if(roundStatus === 'inProgress'){
                // We shouldn't mutate props directly in Svelte 5 if we want to reflect it back,
                // but 'form' is likely immutable from the server load.
                // However, we can handle error display locally if needed, but 'form' is what we get from the action result.
                // If we want to show an error, we should probably have a local error state or rely on re-submission.
                // But for now, let's just alert or set a local error state if we were to add one.
                // But wait, the original code did `form.error = ...`.
                // In Svelte 5 props are read-only. We should use a derived state or a local state initialized from props.
                alert('Please wait until everyone has answered!');
                return
            }
            formSubmitted = false
            message = null
            submitting = false

            // reload page. i have to do this so everyone but the last person to answer also gets the new question
            await invalidateAll()

        } catch (error) {
            console.error('Error resetting form:', error)
            alert('Failed to reset. Please try again.')
        }
    }

    async function endGame() {
        try {
            // Remove the game from the database
            const gameRef = ref(db, `gamecode/${gameCode}`)
            await remove(gameRef)

            // Clear local storage
            localStorage.removeItem('gameCode')
            localStorage.removeItem('playerName')

            // Redirect to start page
            await goto('/')
        } catch (error) {
            console.error('Error ending game:', error)
            alert('Failed to end game. Please try again.')
        }
    }
</script>

<div class="container1">
    
    {#if form?.error}
        <div class="alert alert-error mb-6">
            {form.error}
        </div>
    {/if}

    {#if !formSubmitted}
        <div class="question-container mb-6">
            <h1 class="text">Welcome, {playerName}!</h1>
            <!-- The how to play idea is just not fully baked. i dont like how it looks rn -->
            <!-- <a class="how-to-play" href="/how-to-play">How to play</a> -->
            <h3 class="text">{data.question}</h3>

            <form method="POST">
                <div class="mb-6">
                    <textarea 
                        id="answer" 
                        name="answer" 
                        rows="4" 
                        required
                        class="textarea"
                        placeholder="Your answer"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={submitting}
                    class="submit-btn"
                >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </form>
        </div>
    {:else}
        <div class="result-container bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 text-center">
            <h2 class="text-3xl font-bold mb-6">
                {message}
            </h2>
            <p>Please wait until everyone has answered and then hit next question</p>
            <button 
                onclick={resetForm}
                class="retry-btn"
            >
                Next Question
            </button>

        </div>
    {/if}

    {#if gameCode}
        <GraphScore gameCode={gameCode}/>
    {/if}
    <button 
    onclick={endGame}
    class="end-game-btn"
>
    End Game
</button>
</div>

<style>
    .alert {
        background-color: #fdd6d6;
        border: 1px solid #fbb1b1;
        color: #d8000c;
        padding: 16px;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 16px;
    }

    .alert-error {
        background-color: #ffe5e5;
    }

    .textarea {
        width: 100%;
        padding: 0px;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        font-size: 16px;
        transition: border-color 0.2s ease;
        resize: vertical;
    }

    .textarea:focus {
        border-color: #3b82f6;
        outline: none;
    }

    .submit-btn {
        background-color: #0c62a0;
        color: white;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 8px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 16px;
        font-size: 16px;
    }

    .submit-btn:disabled {
        background-color: #93c5fd;
        cursor: not-allowed;
    }

    .submit-btn:hover:not(:disabled) {
        background-color: #2563eb;
    }

    .end-game-btn {
        background-color: #b82c2c; /* Red color */
        color: white;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 8px;
        width: 20%;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 16px;
        font-size: 16px;
    }

    .end-game-btn:hover {
        background-color: #b91c1c; /* Darker red on hover */
    }

    /* .how-to-play {
		color: var(--color-text);
	}

	.how-to-play::before {
		content: 'i';
		display: inline-block;
		font-size: 0.8em;
		font-weight: 900;
		width: 1em;
		height: 1em;
		padding: 0.2em;
		line-height: 1;
		border: 1.5px solid var(--color-text);
		border-radius: 50%;
		text-align: center;
		margin: 0 0.5em 0 0;
		position: center;
		top: -0.05em;
	} */
</style>