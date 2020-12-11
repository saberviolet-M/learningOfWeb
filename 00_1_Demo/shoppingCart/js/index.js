$(function() {
    //全选-背景
    $('.checkall').on('click', function() {
        $('.j-checkbox').prop('checked', $(this).prop('checked'))
        if ($(this).prop('checked')) {
            $('.j-checkbox').parents('.cart-item').addClass('check-cart-item');
        } else {
            $('.j-checkbox').parents('.cart-item').removeClass('check-cart-item');
        }
        $('.checkall').prop('checked', $(this).prop('checked'));
        setAllCountAndCost();
    })

    //小选择-背景
    $('.j-checkbox').on('click', function() {
        $('.checkall').prop('checked', $('.j-checkbox:checked').length === $('.j-checkbox').length);
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
        setAllCountAndCost();
    })

    // 数量-小计
    function calcPrice(selector, num) {
        let cnt = +selector.siblings('.itxt').val(+selector.siblings('.itxt').val() + num).val();
        if (cnt < 0) {
            cnt = 0;
            selector.siblings('.itxt').val(cnt);
        }
        let price = +selector.parents('.p-num').siblings('.p-price').html().substr(1);
        let cost = +(cnt * price).toFixed(2);
        selector.parents('.p-num').siblings('.p-sum').html(`￥${cost}`);
    }
    $('.increment').on('click', function() {
        calcPrice($(this), 1);
        setAllCountAndCost();
    })
    $('.decrement').on('click', function() {
        calcPrice($(this), -1);
        setAllCountAndCost();
    })
    $('.itxt').on('input', function() {
        let cnt = +$(this).val();
        let price = +$(this).parents('.p-num').siblings('.p-price').html().substr(1);
        let cost = +(cnt * price).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html(`￥${cost}`);
        setAllCountAndCost();
    })
    $('.itxt').on('blur', function() {
        if ($(this).val() === '') {
            $(this).val(0);
        }
        setAllCountAndCost();
    })

    // 删除
    $('.p-action').on('click', function() {
        $(this).parents('.cart-item').remove();
        setAllCountAndCost();
    })

    // 清理购物车
    $('.clear-all').on('click', function() {
        $('.cart-item').remove();
        setAllCountAndCost();
    });

    // 清理购物车
    $('.remove-batch').on('click', function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        setAllCountAndCost();
    });

    // 总计
    function setAllCountAndCost() {
        let allCnt = 0;
        let allCost = 0;
        $('.j-checkbox:checked').each(function(index, item) {
            allCnt += +$(item).parents('.cart-item').find('.itxt').val();
            allCost += +$(item).parents('.cart-item').find('.p-sum').html().substr(1);
        })
        $('.amount-sum > em').html(allCnt);
        if (allCost === 0) {
            $('.price-sum > em').html(`￥0.00`);
        } else {
            $('.price-sum > em').html(`￥${allCost.toFixed(2)}`);
        }

        // 没有项目时全选不可选
        if ($('.cart-item-list').html().trim() === '') {
            $('.checkall').prop('checked', false);
        }
    }
})