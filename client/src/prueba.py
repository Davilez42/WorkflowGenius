def algoritmo(n):
    s = 0
    
    for i in range(0,int(n/2)+1):
        cnt = 0
        for j in range(i,n+1):
        
            cnt+=1
            s+=2*i
        cnt+=1
        print(cnt)    
        s+=2    


def algoritmo2(n):
    i = 0
    s = 1
    while i<n:
        j = 0
        t = 4
        while j<=2*n:
            #print(f"Estados ({j,t})  INVARIANTE ({j,4+j**2 - j})")
            t+=2*j
            j+=1
            
            
        #print(f" Original ({j , t})  ESTADO FINAL F ({2*n+1 , 4+4*n**2 +2*n})")
          
        s+=t
        i+=1
        print(f"INVARIANTE EXT ({i , s })  FORMULA {i,1+(i)*(4*n**2 + 2*n +4)}")  
algoritmo2(6)