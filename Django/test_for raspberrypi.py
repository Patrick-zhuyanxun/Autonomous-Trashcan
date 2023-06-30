input = "UfcFEfJdkVLziQKzQIXsIKyVDDtUlz"
output = ""
tables = ["C","S","L","D","A","N","Y","B","E","F","G","H","I","K","M","O","P","Q","R","T","U","V","W","X","Z"]

def same_column(index_a, index_b):
    """new_index_a = (index_a + 1) if ((index_a % 5) != 4) else (index_a - 4)
    new_index_b = (index_b + 1) if ((index_b % 5) != 4) else (index_b - 4)"""
    new_index_a = (index_a + 5) if (index_a < 20) else (index_a - 20)
    new_index_b = (index_b + 5) if (index_b < 20) else (index_b - 20)
    return new_index_a, new_index_b

def same_row(index_a, index_b):
    """new_index_a = (index_a + 5) if (index_a < 20) else (index_a - 20)
    new_index_b = (index_b + 5) if (index_b < 20) else (index_b - 20)"""
    new_index_a = (index_a + 1) if ((index_a % 5) != 4) else (index_a - 4)
    new_index_b = (index_b + 1) if ((index_b % 5) != 4) else (index_b - 4)
    return new_index_a, new_index_b

def both_different(index_a, index_b):
    new_index_a = index_a + (index_b % 5) - (index_a % 5)
    new_index_b = index_b + (index_a % 5) - (index_b % 5)
    return new_index_a, new_index_b
for i in range(len(input)//2):
    #紀錄大小寫
    a = input[2*(i)]
    b = input[2*(i)+1]
    check_result = [a.isupper(), b.isupper()]
    #接轉換為大寫並略J
    a = a.upper()
    b = b.upper()
    a = "I" if (a == "J") else a
    b = "I" if (b == "J") else b
    index_a = tables.index(a)
    index_b = tables.index(b)
    #加密
    if (((index_a // 5) == (index_b // 5)) and (abs(index_a - index_b) < 4)):
        new_index_a, new_index_b = same_row(index_a, index_b)
    elif((index_a % 5) == (index_b % 5)):
        new_index_a, new_index_b = same_column(index_a, index_b)
    else:
        new_index_a, new_index_b = both_different(index_a, index_b)
    new_a = tables[new_index_a] if (check_result[0]) else tables[new_index_a].lower()
    new_b = tables[new_index_b] if (check_result[1]) else tables[new_index_b].lower()
    output = output + new_a + new_b
print(output)