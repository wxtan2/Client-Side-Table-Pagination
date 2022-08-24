(function($) {

    $.fn.createTablePagination = function(options) {

        var defaults = {
            rowPerPage: 10,
            paginationColor: '#6f7ad7',
            fontColor: '#555555',
            paginationStyle: 'borderless',
            transitionDuration: 200,
            jumpPage: false,
        };

        var settings = $.extend({}, defaults, options);

        var $table = this;
        var $tableId = this.attr('id');

        if ($('.pagintaion-container-' + $tableId).length > 0) {
            $('#pagintaion-' + $tableId).remove();

            var $paginationParentContainer = $('.pagintaion-container-' + $tableId).parent();

            if ($paginationParentContainer.children().length > $('.pagintaion-container-' + $tableId).index() + 1) {
                $paginationParentContainer.children().eq($('.pagintaion-container-' + $tableId).index() + 1).before($table.clone());
            } else {
                $paginationParentContainer.append($table.clone());
            }
            $('.pagintaion-container-' + $tableId).remove();
            // $table = $(tableId);
            $('#' + $tableId).find('tr').show();
        }

        $table = $('#' + $tableId);
        var $currentActivePage = 1;
        var $availableSpace;
        var $pageDisplay = [];
        var $rowPerPage = settings.rowPerPage;
        var $paginationColor = settings.paginationColor;
        var $fontColor = settings.fontColor;
        var $jumpPage = settings.jumpPage;
        var $alignPagination;
        var $paginationStyle = settings.paginationStyle;
        var $transitionDurationMilliSec = settings.transitionDuration;
        var $tableWidth = $table.width();
        var $parentContainer = $table.parent();
        var $totalRow = $table.find('tr').length - 1;
        var $totalPage = Math.ceil($totalRow / $rowPerPage);
        var $tableIndex = $table.index();



        if ($rowPerPage > $totalRow) {
            console.log('check your data, your row per page is bigger then total row');
            return;
        }

        if ($jumpPage == true) {
            $alignPagination = '';
        } else {
            $alignPagination = 'justify-content:center';
        }

        if ($paginationStyle == 'bordered') {
            $paginationStyleText = 'border-radius:0px;\n\
                            border:1px solid ' + $fontColor + ';\n\
                            border-right:none;\n\
                            }\n\
                            .table-pagination-next-btn-' + $tableId + '{\n\
                                border:1px solid ' + $fontColor + '\n\
                            }\n\
                            .more-btn-first-' + $tableId + ',\n\
                            .more-btn-last-' + $tableId + '{\n\
                                border-left:1px solid ' + $fontColor + '\n\
                            }';

        } else {
            $paginationStyleText = 'border-radius:2px;\n\
                            }';
        }


        //create style for pagination
        const style = document.createElement('style');
        style.setAttribute('id', 'pagintaion-' + $tableId);
        //apply styling to pagination
        style.textContent = `.page-list-table-` + $tableId + ` {
            min-width:` + $tableWidth + `px;
            margin-top:20px;
            display:flex;
            align-items:center;
            font-size: 16px;
            ` + $alignPagination + `;
        }

        .table-pagination-pagination-num-` + $tableId + `, 
        .table-pagination-prev-btn-` + $tableId + `, 
        .table-pagination-next-btn-` + $tableId + `{
            color:` + $fontColor + `;
            text-decoration:none;
            height:20px;
            display:flex;
            align-items:center;
            padding:6px 10px;
            cursor:pointer;
            user-select: none;
            ` + $paginationStyleText + `
        

        .table-pagination-prev-btn-` + $tableId + `::before,
        .table-pagination-next-btn-` + $tableId + `::after{
            font-weight:bold;
            color:` + $paginationColor + `;
            white-space: pre;
            font-size: 32px;
            position: relative;
            top: -4px;
        }

        .table-pagination-next-btn-` + $tableId + `::after{
            content:' ›';
        }

        .table-pagination-prev-btn-` + $tableId + `::before{
            content:'‹ ';
        }

        .more-btn-first-` + $tableId + `,
        .more-btn-last-` + $tableId + `{
            color:` + $fontColor + `;
            padding: 5px 2px 5px 3px;
            position:relative;
            left:-1px
        }

        .table-pagination-pagination-num-` + $tableId + `:hover, 
        .table-pagination-prev-btn-` + $tableId + `:hover, 
        .table-pagination-next-btn-` + $tableId + `:hover{
            background-color:` + $paginationColor + `2b;
        }

        .table-pagination-pagination-num-` + $tableId + `.active{
            color:#fff;
            background-color:` + $paginationColor + `;
        }

        .table-pagination-jump-container-` + $tableId + `{
            display:flex;
            align-items:center;
            height:100%;
            color:` + $fontColor + `;
            padding-left:10px;
            margin-left:auto;
        }

        .table-pagination-jump-input-` + $tableId + `{
            width:30px;
            height:100%;
            margin-right:5px;
            padding:6px 5px;
            border:1px solid ` + $fontColor + `;
            border-radius:2px;
            outline:none;
        }

        .table-pagination-jump-input-` + $tableId + `:focus{
            border:2px solid ` + $paginationColor + `;
        }

        .table-pagination-jump-input-` + $tableId + `::-webkit-outer-spin-button,
        .table-pagination-jump-input-` + $tableId + `::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .table-pagination-jump-input-` + $tableId + ` {
            -moz-appearance: textfield;
        }

    `;

        document.head.appendChild(style);


        if ($parentContainer.children().length > $table.index() + 1) {
            $parentContainer.children().eq($tableIndex + 1).before('<div class="pagintaion-container-' + $tableId + '"></div>');

        } else {
            $parentContainer.append('<div class="pagintaion-container-' + $tableId + '"></div>');
        }

        $table.detach().appendTo('.pagintaion-container-' + $tableId);
        $parentContainer = $table.parent();

        //assign the Row Start and Row End for each page.
        for (i = 0; i < $totalPage; i++) {
            var $rowStart = (i * $rowPerPage) + 1;
            var $rowEnd = ((i + 1) * $rowPerPage);
            if ($rowEnd > $totalRow) $rowEnd = $totalRow;
            var $pageDisplayObject = { rowStart: $rowStart, rowEnd: $rowEnd };
            $pageDisplay[i] = $pageDisplayObject;
        }

        $table.find('tr').not(':first').each(function() {
            if ($(this).index() >= $pageDisplay[0].rowStart && $(this).index() <= $pageDisplay[0].rowEnd) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        //create pagination
        $parentContainer.append('<div class="page-list-table-' + $tableId + '"></div>');
        $('.page-list-table-' + $tableId).append('<a class="table-pagination-prev-btn-' + $tableId + '">Prev</a>');

        for (i = 0; i < $totalPage; i++) {
            $('.page-list-table-' + $tableId).append('<a class="table-pagination-pagination-num-' + $tableId + '"  data-page-id="' + (i + 1) + '" >' + (i + 1) + '</a>');
        }
        $('.page-list-table-' + $tableId).append('<a class="table-pagination-next-btn-' + $tableId + '">Next</a>');

        $('.table-pagination-pagination-num-' + $tableId).eq(0).after('<a class="more-btn-first-' + $tableId + '">..</a>');
        $('.table-pagination-pagination-num-' + $tableId).eq(-1).before('<a class="more-btn-last-' + $tableId + '">..</a>');

        //Create Jump Page Input
        if ($jumpPage == true) {
            $('.page-list-table-' + $tableId).append('<div class="table-pagination-jump-container-' + $tableId + '"><input class="table-pagination-jump-input-' + $tableId + '" type="number" max="' + $totalPage + '"> of ' + $totalPage + '</div>');
        }



        //show the pagination number according to size
        var $jumpPageSpace;

        if ($jumpPage == true) $jumpPageSpace = $('.table-pagination-jump-container-' + $tableId).outerWidth();
        else $jumpPageSpace = 0;

        $availableSpace = $tableWidth - $('.table-pagination-prev-btn-' + $tableId).outerWidth() - $('.table-pagination-next-btn-' + $tableId).outerWidth() - $jumpPageSpace;

        var $numBlockSize = $('.table-pagination-pagination-num-' + $tableId).eq(-1).outerWidth();

        var $avaliableBlock = Math.floor($availableSpace / $numBlockSize);

        $pageStart = 1;
        if ($avaliableBlock < $totalPage) {
            $pageEnd = $avaliableBlock;
            $avaliableBlock = $avaliableBlock - 3;
        } else {
            $pageEnd = $totalPage;
        }


        rearrangePagination();

        function displayPage(thisButton, type) {
            if (type == 'number') {
                $currentActivePage = Math.floor(thisButton.attr("data-page-id"));
            } else if (type == 'first') {
                $currentActivePage = 1;
            } else if (type == 'prev') {
                if ($currentActivePage > 1) {
                    $currentActivePage = $currentActivePage - 1;
                }
            } else if (type == 'next') {
                if ($currentActivePage < $totalPage) {
                    $currentActivePage = $currentActivePage + 1;
                }
            } else if (type == 'last') {
                $currentActivePage = $totalPage;
            } else if (type == 'jump') {
                $currentActivePage = parseInt(thisButton.val());
            }

            $table.find('tr').not(':first').each(function() {
                if ($(this).index() >= $pageDisplay[$currentActivePage - 1].rowStart && $(this).index() <= $pageDisplay[$currentActivePage - 1].rowEnd) {
                    $(this).fadeIn($transitionDurationMilliSec);
                } else {
                    $(this).hide();
                }
            });

            $('.page-list-table-' + $tableId).find('.table-pagination-pagination-num-' + $tableId).removeClass("active");
            $('.table-pagination-pagination-num-' + $tableId + '[data-page-id="' + $currentActivePage + '"]').addClass("active");

        }

        function rearrangePagination() {
            if ($currentActivePage == 1) {
                $pageStart = $currentActivePage;
                $pageEnd = $avaliableBlock;
            } else if ($currentActivePage == $totalPage) {
                $pageEnd = $currentActivePage;
                $pageStart = $currentActivePage - $avaliableBlock + 1;
            } else {
                if ((Math.floor($avaliableBlock / 2) * 2) + 1 > $avaliableBlock) {
                    $pageStart = $currentActivePage - Math.floor($avaliableBlock / 2) + 1;
                    $pageEnd = $currentActivePage + Math.floor($avaliableBlock / 2);
                } else {
                    $pageStart = $currentActivePage - Math.floor($avaliableBlock / 2);
                    $pageEnd = $currentActivePage + Math.floor($avaliableBlock / 2);
                }
            }

            if ($pageStart < 1) {
                $pageEnd = $pageEnd - $pageStart + 1;
                $pageStart = 1;
                if ($pageEnd > $totalPage) {
                    $pageEnd = $totalPage;
                }

            }
            if ($pageEnd > $totalPage) {
                $pageStart = $pageStart - ($pageEnd - $totalPage);
                $pageEnd = $totalPage;
                if ($pageStart < 1) {
                    $pageStart = 1;

                }
            }

            $('.table-pagination-pagination-num-' + $tableId).each(function() {
                if ($(this).attr('data-page-id') >= $pageStart && $(this).attr('data-page-id') <= $pageEnd) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            if ($pageStart == 1) {
                // $(".table-pagination-first-btn").hide();
                $('.more-btn-first-' + $tableId).hide();
            } else {
                // $(".table-pagination-first-btn").show();
                $('.table-pagination-pagination-num-' + $tableId + '[data-page-id="1"]').show();
                $('.more-btn-first-' + $tableId).show();
            }

            if ($pageEnd == $totalPage) {
                // $(".table-pagination-last-btn").hide();
                $('.more-btn-last-' + $tableId).hide();
            } else {
                // $(".table-pagination-last-btn").show();
                $('.table-pagination-pagination-num-' + $tableId + '[data-page-id="' + $totalPage + '"]').show();
                $('.more-btn-last-' + $tableId).show();
            }

            $('.table-pagination-jump-input-' + $tableId).val($currentActivePage);

        }

        //Defaultly set the 1st pagination active
        $('.table-pagination-pagination-num-' + $tableId + '[data-page-id="1"]').addClass("active");


        //change page when click on number pagination
        $('.table-pagination-pagination-num-' + $tableId).on("click", function() {
            displayPage($(this), 'number');
            rearrangePagination();
        });

        //change to prev page when prev button clicked
        $('.table-pagination-prev-btn-' + $tableId).on("click", function() {
            displayPage($(this), 'prev');
            rearrangePagination()
        });

        //change to next page when next button clicked
        $('.table-pagination-next-btn-' + $tableId).on("click", function() {
            displayPage($(this), 'next');
            rearrangePagination()
        });

        //show the page when user input in jump page
        $('.table-pagination-jump-input-' + $tableId).on({
            "change": function() {
                if ($(this).val() >= 1 && $(this).val() <= $totalPage) {
                    displayPage($(this), 'jump');
                    rearrangePagination();
                }
            }
        });


    }


}(jQuery));