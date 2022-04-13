<?php

use App\Models\Upload;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    // public function saveImages(Request $request, $uploadedFileUrl)
    // {
    //     $image = new Upload();
    //     $image->image_name = $request->file('file')->getClientOriginalName();
    //     $image->image_url = $uploadedFileUrl;
    //     $image->save();
    // }

    public function up()
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image_name');
            $table->string('image_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('uploads');
    }
};
