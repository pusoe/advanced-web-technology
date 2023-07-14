<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i <50 ; $i++){
            Tasks::create([
                'title' => 'Task title '+i;
                'description' => 'Task description '+i;
                'status' => 'new';
            ]);
        }
    }
}
