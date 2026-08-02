import { Skeleton } from "@/components/ui/skeleton";

const AddressSkeleton = () => {
  return (
    <div className="space-y-8">

      {/* Header Skeleton */}

      <div className="rounded-3xl border bg-white p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex gap-5">

            <Skeleton className="h-16 w-16 rounded-2xl" />

            <div className="space-y-3">

              <Skeleton className="h-8 w-56" />

              <Skeleton className="h-4 w-96" />

              <Skeleton className="h-4 w-72" />

              <div className="flex gap-3 pt-3">

                <Skeleton className="h-10 w-36 rounded-full" />

                <Skeleton className="h-10 w-40 rounded-full" />

              </div>

            </div>

          </div>

          <Skeleton className="h-12 w-48 rounded-xl" />

        </div>

      </div>

      {/* Address Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {[...Array(6)].map((_, index) => (

          <div
            key={index}
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Skeleton className="h-12 w-12 rounded-2xl" />

                <div className="space-y-2">

                  <Skeleton className="h-5 w-20 rounded-full" />

                  <Skeleton className="h-4 w-24" />

                </div>

              </div>

              <Skeleton className="h-10 w-10 rounded-xl" />

            </div>

            {/* Name */}

            <Skeleton className="mb-3 h-6 w-40" />

            <Skeleton className="mb-6 h-4 w-32" />

            {/* Address */}

            <div className="space-y-3 rounded-2xl bg-slate-50 p-4">

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-5/6" />

              <Skeleton className="h-4 w-3/4" />

              <Skeleton className="h-4 w-1/2" />

            </div>

            {/* Footer */}

            <div className="mt-6 flex gap-3">

              <Skeleton className="h-10 flex-1 rounded-xl" />

              <Skeleton className="h-10 flex-1 rounded-xl" />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AddressSkeleton;