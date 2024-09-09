<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->string('store_name',255)->nullable();
            $table->string('domain_name',255)->nullable();
            $table->bigInteger('theme_id')->nullable();
            $table->string('tin_number',255)->nullable();
            $table->string('bin_number',255)->nullable();
            $table->bigInteger('delivery_partner_id')->nullable();
            $table->bigInteger('payment_partner_id')->nullable(); 
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
