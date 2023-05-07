<div class="card-wrapper shadow-xl">
    <div class="card-header p-4">
        <div class="pfp-wrapper">
            <img src="test_image.PNG" alt="pfp" class="pfp" width="50px">
        </div>
        <div class="op-data">
            <p>tim.b00</p>
            <p>Vanilla Sky</p>
        </div>
        <div class="menu-wrapper">
            <i class="fa-solid fa-ellipsis fa-2xl cursor-pointer"></i>
        </div>
    </div>
    <div class="card-body">
        <img src="test_image.PNG" alt="test_image">
    </div>
    <div class="card-footer">
        <div>
            <i class="fa-regular fa-heart fa-xl cursor-pointer"></i>
            <b class="ml-2 mr-4">94k</b>
            
            <i class="fa-regular fa-comment fa-xl"></i>
            <b class="ml-2 mr-4">1.3k</b>
        </div>
        <div class="flex items-center w-full pt-4">
            <form action="?/comment" class="flex justify-evenly w-full mt-3" method="POST">
                <input placeholder="Kommentieren" class="input w-full" />
                <button type="submit" class="comment-btn pl-4">
                    Posten
                </button>
            </form>
        </div>
    </div>
</div>

<style>

    .menu-wrapper {
        height: 100%;
        width: 50px;
        display: flex;
        align-items: center;
    }

    .op-data {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        font-size: 10pt;
        width: 100%;
        justify-content: center;
    }

    .pfp-wrapper {
        border-radius: 100%;
        object-fit: cover;
        background-color: rebeccapurple;
    }

    .pfp {
        border-radius: 100%;
    }

    .comment-btn {
        color: rgb(63, 63, 255);
        font-weight: 400;
    }

    .card-wrapper {
        display: flex;
        flex-direction: column;
        /* width: 650px; */
        align-items: center;
        margin-top: 35px;
        margin-bottom: 35px;
        border-radius: 10px;
    }
    .card-header {
        display: flex;
        width: 100%;
        background-color: black;
        justify-content: center;
        border-radius: 10px 10px 0px 0px
    }
    .card-body {
        display: flex;
        object-fit: cover;
        background-color: rgb(18, 18, 18);
    }
    .card-footer {
        display: flex;
        flex-direction: column;
        object-fit: cover;
        background-color: rgb(18, 18, 18);
        width: 100%;
        padding: 15px;
        border-radius: 0px 0px 10px 10px;
    }
</style>