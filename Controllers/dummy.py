def TimeConvert(num):
    num=int(num)
    return str(num//60)+':'+str(num%60)

print(TimeConvert(input()))
