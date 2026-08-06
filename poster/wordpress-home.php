<?php
/*
Template Name: Kids Exercise Home
*/
get_header(); ?>

<style>
/* Add your CSS here or enqueue it */
<?php include 'styles.css'; ?>
</style>

<div class="container">
    <div class="header">
        <h1 class="title">KIDS EXERCISE</h1>
        <p class="subtitle">🌟 10 Days of Fun Activities! 🌟</p>
        <p class="home-desc">Join our amazing 10-day exercise journey! Each day has 5 fun activities to keep you healthy, strong, and happy!</p>
    </div>
    
    <div class="days-grid">
        <a href="<?php echo home_url('/kids-exercise-day-1'); ?>" class="day-card">
            <div class="day-number">1</div>
            <div class="day-title">Basic Moves</div>
            <div class="day-preview">Planks • Push-ups • Crunches</div>
        </a>
        
        <a href="<?php echo home_url('/kids-exercise-day-2'); ?>" class="day-card">
            <div class="day-number">2</div>
            <div class="day-title">Cardio Fun</div>
            <div class="day-preview">Running • Stretching • Bridge</div>
        </a>
        
        <!-- Continue for all 10 days -->
    </div>
    
    <div class="home-footer">
        <div class="tips">
            <h3>💡 Tips for Parents:</h3>
            <ul>
                <li>Do exercises together with your child</li>
                <li>Make it fun with music and encouragement</li>
                <li>Take breaks when needed</li>
                <li>Celebrate completing each day!</li>
            </ul>
        </div>
    </div>
</div>

<?php get_footer(); ?>
